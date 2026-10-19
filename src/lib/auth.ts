import crypto from "crypto";

const SECRET = process.env.QR_AUTH_SECRET || "alternika_qr_default_salt_2026_9823479";
const ADMIN_PASSWORD = process.env.QR_ADMIN_PASSWORD || "Imbera2026$";

/**
 * Creates a cryptographically signed session token for the QR Studio
 */
export function createSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies if a given token or header is valid and not expired
 */
export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;

  // Direct password check fallback for backwards compatibility / curl
  if (token === ADMIN_PASSWORD) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [payloadBase64, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8")
    );

    if (payload.exp && Date.now() > payload.exp) {
      return false; // Token expired
    }

    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Validates the raw master password safely using timing-safe comparison
 */
export function validateMasterPassword(password: string): boolean {
  if (!password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
