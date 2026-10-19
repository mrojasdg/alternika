import { NextRequest, NextResponse } from "next/server";
import { getQRByCode, incrementScanCount } from "@/lib/qr-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

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
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          },
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

    // Optional raw 307 redirect for API crawlers
    const isRaw = req.nextUrl.searchParams.get("raw") === "1";
    if (isRaw) {
      const response = NextResponse.redirect(destination, 307);
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
      response.headers.set("CDN-Cache-Control", "no-store");
      response.headers.set("Vercel-CDN-Cache-Control", "no-store");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      return response;
    }

    // Return HTTP 200 with instant client-side redirect (meta refresh + location.replace).
    // Using HTTP 200 completely prevents iOS Safari, Chrome, and mobile camera scanners
    // from storing a persistent 301/302/307 redirect in their browser redirect cache.
    // Every scan/visit fetches a fresh HTML response with the latest Supabase URL.
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta http-equiv="refresh" content="0;url=${encodeURI(destination)}" />
  <title>Alternika | Redirigiendo...</title>
  <script>
    try {
      window.location.replace(${JSON.stringify(destination)});
    } catch (e) {
      window.location.href = ${JSON.stringify(destination)};
    }
  </script>
</head>
<body style="background:#040814;color:#e2e8f0;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center;">
  <div style="background:#091329;border:1px solid rgba(0,240,255,0.25);border-radius:24px;padding:32px 24px;max-width:380px;box-shadow:0 20px 50px rgba(0,0,0,0.5);">
    <div style="width:36px;height:36px;border-radius:50%;border:3px solid #00f0ff;border-top-color:transparent;margin:0 auto 16px auto;animation:spin 0.8s linear infinite;"></div>
    <h2 style="font-size:17px;font-weight:700;color:#ffffff;margin:0 0 6px 0;">Redirigiendo...</h2>
    <p style="font-size:12px;color:#94a3b8;margin:0 0 16px 0;">Accediendo al enlace de destino...</p>
    <a href="${destination}" style="display:inline-block;background:#00f0ff;color:#040814;text-decoration:none;font-weight:700;padding:9px 20px;border-radius:9999px;font-size:12px;">Abrir ahora</a>
  </div>
  <style>
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</body>
</html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Error handling QR redirect:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
