import QRCode from "qrcode";

/**
 * Generates a clean, medium-resolution JPG image containing the QR code
 * and the unique identification code (e.g. 2026A1) nicely embedded at the bottom.
 */
export async function generateQRJpgBlob(
  redirectUrl: string,
  code: string
): Promise<Blob> {
  const qrCanvas = document.createElement("canvas");
  
  // Render high quality QR code
  await QRCode.toCanvas(qrCanvas, redirectUrl, {
    width: 700,
    margin: 2,
    errorCorrectionLevel: "H",
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  // Final canvas with extra room at the bottom for embedded identification text
  const finalCanvas = document.createElement("canvas");
  const canvasWidth = 700;
  const bottomPadding = 90;
  const canvasHeight = canvasWidth + bottomPadding;

  finalCanvas.width = canvasWidth;
  finalCanvas.height = canvasHeight;

  const ctx = finalCanvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo obtener el contexto 2D del canvas");

  // 1. Fill crisp white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 2. Draw QR code
  ctx.drawImage(qrCanvas, 0, 0, canvasWidth, canvasWidth);

  // 3. Subtle separator line
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, canvasWidth + 5);
  ctx.lineTo(canvasWidth - 60, canvasWidth + 5);
  ctx.stroke();

  // 4. Embedded Code Text (e.g. 2026A1)
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 28px 'Century Gothic', -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(code.toUpperCase(), canvasWidth / 2, canvasWidth + 38);

  // 5. Small brand / dynamic indicator
  ctx.fillStyle = "#94a3b8";
  ctx.font = "500 13px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.fillText("ALTERLNK · DYNAMIC QR", canvasWidth / 2, canvasWidth + 66);

  // Convert to JPEG blob
  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Error al generar la imagen JPG del QR"));
      },
      "image/jpeg",
      0.92
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
