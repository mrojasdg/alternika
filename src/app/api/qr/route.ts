import { NextRequest, NextResponse } from "next/server";
import {
  getAllQRs,
  createQR,
  updateQR,
  deleteQR,
  generateNextCode,
} from "@/lib/qr-service";
import { isSupabaseConfigured } from "@/lib/supabase";
import { verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAuthorized(req: NextRequest): boolean {
  const cookieToken = req.cookies.get("alternika_qr_session")?.value;
  const authHeader = req.headers.get("x-qr-auth");
  const bearerToken = req.headers.get("authorization")?.replace("Bearer ", "");
  const queryAuth = req.nextUrl.searchParams.get("auth");

  const token = authHeader || bearerToken || cookieToken || queryAuth;
  return verifySessionToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const qrs = await getAllQRs();
  const nextCode = await generateNextCode();
  const totalScans = qrs.reduce((acc, curr) => acc + (curr.scan_count || 0), 0);
  const mostScanned = [...qrs].sort((a, b) => (b.scan_count || 0) - (a.scan_count || 0))[0] || null;

  const res = NextResponse.json({
    qrs,
    nextCode,
    stats: {
      totalQRs: qrs.length,
      totalScans,
      mostScanned,
    },
    isSupabase: isSupabaseConfigured(),
  });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return res;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { business_name, destination_url, code } = body;

    if (!business_name || !destination_url) {
      return NextResponse.json(
        { error: "El nombre del negocio y el link final son requeridos." },
        { status: 400 }
      );
    }

    const created = await createQR({
      business_name,
      destination_url,
      code,
    });

    return NextResponse.json({ success: true, qr: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error al crear el código QR." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, business_name, destination_url, is_active, code } = body;

    if (!id) {
      return NextResponse.json(
        { error: "El ID del QR es obligatorio." },
        { status: 400 }
      );
    }

    const updated = await updateQR(id, {
      business_name,
      destination_url,
      is_active,
      code,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "No se encontró el registro para actualizar." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, qr: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error al actualizar el código QR." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "El ID del QR es requerido." },
        { status: 400 }
      );
    }

    const deleted = await deleteQR(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error al eliminar el código QR." },
      { status: 500 }
    );
  }
}
