import { supabase, isSupabaseConfigured, DynamicQR } from "./supabase";

// In-memory fallback storage for when Supabase is not yet connected
const memoryStore: DynamicQR[] = [
  {
    id: "demo-1",
    code: "2026A1",
    business_name: "Alternika Demo Card",
    destination_url: "https://alternika.com.mx/maurojas",
    scan_count: 14,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    code: "2026A2",
    business_name: "Contacto WhatsApp",
    destination_url: "https://wa.me/525522965764",
    scan_count: 28,
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getAllQRs(): Promise<DynamicQR[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("dynamic_qrs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data as DynamicQR[];
    }
    console.error("Supabase error fetching QRs, using memory store:", error);
  }
  return [...memoryStore].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getQRByCode(code: string): Promise<DynamicQR | null> {
  const normalized = code.trim().toUpperCase();
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("dynamic_qrs")
      .select("*")
      .eq("code", normalized)
      .single();

    if (!error && data) {
      return data as DynamicQR;
    }
  }

  const found = memoryStore.find((q) => q.code.toUpperCase() === normalized);
  return found || null;
}

export async function generateNextCode(): Promise<string> {
  const qrs = await getAllQRs();
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

  if (isSupabaseConfigured() && supabase) {
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

    if (!error && data) {
      return data as DynamicQR;
    }
    console.error("Supabase insert error, falling back to memory:", error);
  }

  const newQR: DynamicQR = {
    id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    code,
    business_name: params.business_name.trim(),
    destination_url: url,
    scan_count: 0,
    is_active: true,
    created_at: now,
    updated_at: now,
  };

  memoryStore.unshift(newQR);
  return newQR;
}

export async function updateQR(
  id: string,
  params: Partial<Pick<DynamicQR, "business_name" | "destination_url" | "is_active" | "code">>
): Promise<DynamicQR | null> {
  const now = new Date().toISOString();
  const updateData: any = { updated_at: now };

  if (params.business_name !== undefined) {
    updateData.business_name = params.business_name.trim();
  }
  if (params.destination_url !== undefined) {
    let url = params.destination_url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    updateData.destination_url = url;
  }
  if (params.is_active !== undefined) {
    updateData.is_active = params.is_active;
  }
  if (params.code !== undefined) {
    updateData.code = params.code.trim().toUpperCase();
  }

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("dynamic_qrs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      return data as DynamicQR;
    }
  }

  const index = memoryStore.findIndex((q) => q.id === id);
  if (index !== -1) {
    memoryStore[index] = {
      ...memoryStore[index],
      ...updateData,
    };
    return memoryStore[index];
  }

  return null;
}

export async function incrementScanCount(code: string): Promise<number> {
  const normalized = code.trim().toUpperCase();

  if (isSupabaseConfigured() && supabase) {
    // Try calling the RPC function if available
    const { error: rpcError } = await supabase.rpc("increment_qr_scan", {
      target_code: normalized,
    });

    if (!rpcError) {
      const qr = await getQRByCode(normalized);
      return qr?.scan_count || 1;
    }

    // Fallback: standard select & update
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
  }

  const item = memoryStore.find((q) => q.code.toUpperCase() === normalized);
  if (item) {
    item.scan_count += 1;
    item.updated_at = new Date().toISOString();
    return item.scan_count;
  }

  return 1;
}

export async function deleteQR(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("dynamic_qrs").delete().eq("id", id);
    if (!error) return true;
  }

  const idx = memoryStore.findIndex((q) => q.id === id);
  if (idx !== -1) {
    memoryStore.splice(idx, 1);
    return true;
  }

  return false;
}
