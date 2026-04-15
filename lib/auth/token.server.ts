import "server-only";

import { getAuthTokenSecret } from "@/lib/env";
import {
  AUTH_TOKEN_HEADER,
  AUTH_TOKEN_TTL_SECONDS,
} from "@/lib/auth/token";
import type { AuthTokenPayload } from "@/types/auth";

const textEncoder = new TextEncoder();

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

export const createAuthToken = async (
  payload: Omit<AuthTokenPayload, "exp" | "iat">,
  issuedAt = Math.floor(Date.now() / 1000),
) => {
  const completePayload: AuthTokenPayload = {
    ...payload,
    exp: issuedAt + AUTH_TOKEN_TTL_SECONDS,
    iat: issuedAt,
  };

  const encodedHeader = toBase64Url(
    textEncoder.encode(JSON.stringify(AUTH_TOKEN_HEADER)),
  );
  const encodedPayload = toBase64Url(
    textEncoder.encode(JSON.stringify(completePayload)),
  );
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await signTokenValue(unsignedToken, getAuthTokenSecret());

  return `${unsignedToken}.${signature}`;
};
