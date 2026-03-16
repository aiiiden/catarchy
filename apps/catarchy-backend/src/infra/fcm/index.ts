import { getEnv } from "../../lib/env";

const FCM_PROJECT_ID = "catarchy-general";
const FCM_ENDPOINT = `https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_ID}/messages:send`;
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

function base64url(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/\\n/g, "\n") // literal \n → actual newline (env var에서 올 때)
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}

async function getAccessToken(): Promise<string> {
  const env = getEnv();
  const email = env.FIREBASE_SERVICE_ACCOUNT_EMAIL!;
  const privateKeyPem = env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY!;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })),
  );
  const payload = base64url(
    new TextEncoder().encode(
      JSON.stringify({
        iss: email,
        scope: "https://www.googleapis.com/auth/firebase.messaging",
        aud: GOOGLE_TOKEN_ENDPOINT,
        exp: now + 3600,
        iat: now,
      }),
    ),
  );

  const signingInput = `${header}.${payload}`;
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(signingInput),
  );

  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const { access_token } = (await res.json()) as { access_token: string };
  return access_token;
}

export async function sendPushNotification({
  token,
  title,
  body,
}: {
  token: string;
  title: string;
  body: string;
}): Promise<void> {
  const env = getEnv();
  if (!env.FIREBASE_SERVICE_ACCOUNT_EMAIL || !env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    return;
  }

  const accessToken = await getAccessToken();

  await fetch(FCM_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: { token, notification: { title, body } },
    }),
  });
}

export async function sendPushNotificationToUser({
  tokens,
  title,
  body,
}: {
  tokens: string[];
  title: string;
  body: string;
}): Promise<void> {
  if (tokens.length === 0) return;
  await Promise.allSettled(
    tokens.map((token) => sendPushNotification({ token, title, body })),
  );
}
