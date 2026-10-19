import QRCode from "qrcode";

/**
 * Generates a clean, 100% SQUARE (1:1) medium-resolution JPG image (800x800px).
 * The QR code sits centered with the identification code (e.g. 2026A1) nestled
 * neatly inside the bottom margin without any extra branding or labels,
 * completely ready for print and acrylic stands without requiring any cropping.
 */
export async function generateQRJpgBlob(
  redirectUrl: string,
  code: string
): Promise<Blob> {
  const qrCanvas = document.createElement("canvas");
  const canvasSize = 800; // Perfect square
  const qrSize = 710;
  const qrX = (canvasSize - qrSize) / 2; // 45px
  const qrY = 24;

  // Render sharp QR code
  await QRCode.toCanvas(qrCanvas, redirectUrl, {
    width: qrSize,
    margin: 1,
    errorCorrectionLevel: "H",
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  // Final 1:1 square canvas
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = canvasSize;
  finalCanvas.height = canvasSize;

  const ctx = finalCanvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo obtener el contexto 2D del canvas");

  // 1. Fill solid crisp white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // 2. Draw QR code
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // 3. Embedded Code Text (e.g. 2026A1) nestled right below the QR edge
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 22px 'Century Gothic', -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(code.toUpperCase(), canvasSize / 2, canvasSize - 32);

  // Convert to JPEG blob at high quality
  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Error al generar la imagen JPG del QR"));
      },
      "image/jpeg",
      0.94
    );
  });
}

export async function downloadQRJpg(
  redirectUrl: string,
  code: string,
  businessName?: string
): Promise<void> {
  const blob = await generateQRJpgBlob(redirectUrl, code);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  
  const cleanName = (businessName || code)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 30);

  a.href = url;
  a.download = `QR_${code}_${cleanName}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
