import { supabase, DynamicQR } from "./supabase";

/**
 * 100% Pure Supabase Service Layer
 * All reads, writes, updates and deletions occur directly in the cloud PostgreSQL database.
 */

export function normalizeQR(row: any): DynamicQR {
  if (!row) return row;
  const rawName = typeof row.business_name === "string" ? row.business_name : "";
  const isSoldByTag = rawName.includes("[VENDIDO]") || rawName.includes("<!--sold-->");
  const is_sold = row.is_sold !== undefined && row.is_sold !== null ? Boolean(row.is_sold) : isSoldByTag;
  const cleanName = rawName
    .replace(/\s*\[VENDIDO\]\s*/gi, "")
    .replace(/<!--sold-->/gi, "")
    .trim();

  return {
    ...row,
    business_name: cleanName || rawName,
    is_sold,
  };
}

export async function getAllQRs(): Promise<DynamicQR[]> {
  const { data, error } = await supabase
    .from("dynamic_qrs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching QRs from Supabase:", error);
    throw new Error(`Error Supabase: ${error.message}`);
  }

  return (data || []).map(normalizeQR);
}

export async function getQRByCode(code: string): Promise<DynamicQR | null> {
  const normalized = code.trim().toUpperCase();

  const { data, error } = await supabase
    .from("dynamic_qrs")
    .select("*")
    .eq("code", normalized)
    .maybeSingle();

  if (error) {
    console.error("Error fetching QR by code from Supabase:", error);
  }

  return data ? normalizeQR(data) : null;
}

export async function generateNextCode(): Promise<string> {
  const qrs = await getAllQRs().catch(() => []);
  const prefix = "2026A";
  let maxNum = 0;

  for (const qr of qrs) {
    if (qr.code.toUpperCase().startsWith(prefix)) {
      const rest = qr.code.toUpperCase().replace(prefix, "");
      const parsed = parseInt(rest, 10);
      if (!isNaN(parsed) && parsed > maxNum) {
        maxNum = parsed;
      }
    }
  }

  return `${prefix}${maxNum + 1}`;
}

export async function createQR(params: {
  business_name: string;
  destination_url: string;
  code?: string;
}): Promise<DynamicQR> {
  const code = (params.code?.trim() || (await generateNextCode())).toUpperCase();
  const now = new Date().toISOString();

  // Validate destination url has protocol
  let url = params.destination_url.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  const { data, error } = await supabase
    .from("dynamic_qrs")
    .insert({
      code,
      business_name: params.business_name.trim(),
      destination_url: url,
      scan_count: 0,
      is_active: true,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) {
    console.error("Error inserting QR into Supabase:", error);
    throw new Error(`Error al guardar en Supabase: ${error.message}`);
  }

  return data as DynamicQR;
}

export async function updateQR(
  id: string,
  params: Partial<Pick<DynamicQR, "business_name" | "destination_url" | "is_active" | "code" | "scan_count" | "is_sold">>
): Promise<DynamicQR | null> {
  const now = new Date().toISOString();
  const updateData: any = { updated_at: now };

  if (params.business_name !== undefined) {
    updateData.business_name = params.business_name.trim();
  }
  if (params.destination_url !== undefined) {
    let url = params.destination_url.trim();
    if (/placeid=place_?id:/i.test(url)) {
      url = url.replace(/placeid=place_?id:/i, "placeid=");
    } else if (/^place\s*id\s*[:=]/i.test(url) || url.startsWith("ChIJ")) {
      const clean = url.replace(/^place\s*id\s*[:=]\s*/i, "").replace(/\s+/g, "");
      url = `https://search.google.com/local/writereview?placeid=${clean}`;
    } else if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    updateData.destination_url = url;
  }
  if (params.is_active !== undefined) {
    updateData.is_active = params.is_active;
  }
  if (params.scan_count !== undefined) {
    updateData.scan_count = params.scan_count;
  }
  if (params.code !== undefined) {
    updateData.code = params.code.trim().toUpperCase();
  }

  // 1. Try update with is_sold column directly
  const updateWithSold: any = { ...updateData };
  if (params.is_sold !== undefined) {
    updateWithSold.is_sold = params.is_sold;
  }

  let { data, error } = await supabase
    .from("dynamic_qrs")
    .update(updateWithSold)
    .eq("id", id)
    .select()
    .single();

  // 2. If is_sold column does not exist yet in public.dynamic_qrs, fall back to encoding [VENDIDO] in business_name
  if (error && (error.code === "PGRST204" || error.message?.includes("is_sold"))) {
    const updateWithoutSold = { ...updateData };

    if (params.is_sold !== undefined) {
      let bName: string = params.business_name || "";
      if (!bName) {
        const { data: curr } = await supabase
          .from("dynamic_qrs")
          .select("business_name")
          .eq("id", id)
          .single();
        bName = curr?.business_name || "";
      }
      const cleanBName = bName.replace(/\s*\[VENDIDO\]\s*/gi, "").replace(/<!--sold-->/gi, "").trim();
      updateWithoutSold.business_name = params.is_sold ? `${cleanBName} [VENDIDO]` : cleanBName;
    }

    const fallbackRes = await supabase
      .from("dynamic_qrs")
      .update(updateWithoutSold)
      .eq("id", id)
      .select()
      .single();

    if (fallbackRes.error) {
      console.error("Error updating QR fallback in Supabase:", fallbackRes.error);
      throw new Error(`Error al actualizar en Supabase: ${fallbackRes.error.message}`);
    }
    data = fallbackRes.data;
  } else if (error) {
    console.error("Error updating QR in Supabase:", error);
    throw new Error(`Error al actualizar en Supabase: ${error.message}`);
  }

  return normalizeQR(data);
}

export async function incrementScanCount(code: string): Promise<number> {
  const normalized = code.trim().toUpperCase();

  // 1. Try atomic RPC function
  const { error: rpcError } = await supabase.rpc("increment_qr_scan", {
    target_code: normalized,
  });

  if (!rpcError) {
    const qr = await getQRByCode(normalized);
    return qr?.scan_count || 1;
  }

  // 2. Fallback: Select and update
  const { data: existing } = await supabase
    .from("dynamic_qrs")
    .select("scan_count")
    .eq("code", normalized)
    .single();

  if (existing) {
    const newCount = (existing.scan_count || 0) + 1;
    await supabase
      .from("dynamic_qrs")
      .update({ scan_count: newCount, updated_at: new Date().toISOString() })
      .eq("code", normalized);
    return newCount;
  }

  return 1;
}

export async function deleteQR(id: string): Promise<boolean> {
  const { error } = await supabase.from("dynamic_qrs").delete().eq("id", id);
  if (error) {
    console.error("Error deleting QR from Supabase:", error);
    throw new Error(`Error al eliminar de Supabase: ${error.message}`);
  }
  return true;
}
