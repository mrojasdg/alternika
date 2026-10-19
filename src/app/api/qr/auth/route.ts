import { NextRequest, NextResponse } from "next/server";
import { validateMasterPassword, createSessionToken, verifySessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || !validateMasterPassword(password)) {
      // Artificial delay to prevent brute-force attacks
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json(
        { error: "Contraseña incorrecta. Acceso restringido." },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true, token });

    // Set secure HTTP-only cookie
    response.cookies.set("alternika_qr_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error procesando autenticación." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const cookieToken = req.cookies.get("alternika_qr_session")?.value;
  const headerToken = req.headers.get("x-qr-auth") || req.headers.get("authorization")?.replace("Bearer ", "");
  const token = headerToken || cookieToken;

  const isValid = verifySessionToken(token);
  return NextResponse.json({ authenticated: isValid });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("alternika_qr_session");
  return response;
}
