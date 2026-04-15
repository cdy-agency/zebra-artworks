import type { AuthTokenPayload } from "@/types/auth";

export const AUTH_COOKIE_NAME = "km_access_token";
export const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24;
export const AUTH_TOKEN_HEADER = {
  alg: "HS256",
  typ: "JWT",
} as const;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const toBase64Url = (bytes: Uint8Array) => {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(`${normalized}${padding}`);

  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const decodeJsonSegment = <T>(value: string) =>
  JSON.parse(textDecoder.decode(fromBase64Url(value))) as T;

const encodeSecret = (secret: string) =>
  crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

const signTokenValue = async (value: string, secret: string) => {
  const key = await encodeSecret(secret);
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
};

const signaturesMatch = (left: string, right: string) => {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;

  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
};

export const verifyAuthToken = async (
  token: string | undefined | null,
  secret = process.env.AUTH_TOKEN_SECRET,
) => {
  if (!token) {
    return null;
  }

  if (!secret) {
    throw new Error("Missing required environment variable: AUTH_TOKEN_SECRET");
  }

  const segments = token.split(".");

  if (segments.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, providedSignature] = segments;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = await signTokenValue(unsignedToken, secret);

  if (!signaturesMatch(providedSignature, expectedSignature)) {
    return null;
  }

  const header = decodeJsonSegment<typeof AUTH_TOKEN_HEADER>(encodedHeader);

  if (
    header.alg !== AUTH_TOKEN_HEADER.alg ||
    header.typ !== AUTH_TOKEN_HEADER.typ
  ) {
    return null;
  }

  const payload = decodeJsonSegment<AuthTokenPayload>(encodedPayload);
  const now = Math.floor(Date.now() / 1000);

  if (
    typeof payload.sub !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.role !== "string" ||
    typeof payload.exp !== "number" ||
    typeof payload.iat !== "number" ||
    payload.exp <= now
  ) {
    return null;
  }

  return payload;
};

export const getBearerTokenFromAuthorizationHeader = (
  authorizationHeader: string | null,
) => {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length).trim() || null;
};
