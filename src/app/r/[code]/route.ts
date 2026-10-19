import { NextRequest, NextResponse } from "next/server";
import { getQRByCode, incrementScanCount } from "@/lib/qr-service";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  if (!code) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const qr = await getQRByCode(code);

    if (!qr || qr.is_active === false) {
      // Inactive or not found page
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>QR no disponible | Alternika</title>
            <style>
              body {
                background: #040814;
                color: #e2e8f0;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 24px;
                text-align: center;
              }
              .card {
                background: #091329;
                border: 1px solid rgba(0, 240, 255, 0.2);
                border-radius: 24px;
                padding: 40px 32px;
                max-width: 420px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
              }
              .badge {
                display: inline-block;
                background: rgba(239, 68, 68, 0.15);
                color: #f87171;
                font-weight: 700;
                font-size: 12px;
                padding: 4px 12px;
                border-radius: 9999px;
                margin-bottom: 16px;
                letter-spacing: 0.05em;
              }
              h1 {
                font-size: 22px;
                margin: 0 0 12px 0;
                color: #ffffff;
              }
              p {
                font-size: 14px;
                color: #94a3b8;
                line-height: 1.6;
                margin: 0 0 24px 0;
              }
              a {
                display: inline-block;
                background: #00f0ff;
                color: #040814;
                text-decoration: none;
                font-weight: 700;
                padding: 12px 24px;
                border-radius: 9999px;
                font-size: 14px;
                transition: transform 0.2s, background 0.2s;
              }
              a:hover {
                background: #67e8f9;
                transform: translateY(-2px);
              }
            </style>
          </head>
          <body>
            <div class="card">
              <span class="badge">CÓDIGO: ${code.toUpperCase()}</span>
              <h1>Código QR no disponible</h1>
              <p>Este código QR ha sido pausado temporalmente o la ruta no existe. Por favor contacta al administrador.</p>
              <a href="https://alternika.com.mx">Ir a Alternika</a>
            </div>
          </body>
        </html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Increment scan count in background or await
    await incrementScanCount(code);

    // Auto-clean destination URL if it accidentally contains PlaceID: or spaces
    let destination = qr.destination_url.trim();
    if (/placeid=place_?id:/i.test(destination)) {
      destination = destination.replace(/placeid=place_?id:/i, "placeid=");
    }

    // Perform redirect with strict anti-caching headers so browser never caches old redirect
    const response = NextResponse.redirect(destination, 307);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (error) {
    console.error("Error handling QR redirect:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
