import { SignJWT, jwtVerify } from "jose";

// Define a secret key for JWT encryption
const secretKey = process.env.AUTH_SECRET;

if (!secretKey || typeof secretKey !== "string" || secretKey.length < 32) {
  throw new Error("AUTH_SECRET is not defined");
}

export function freshExpiryDate() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days from now
}

export function timeToExpiryInMs(expiry: Date | string) {
  return new Date(expiry).getTime() - Date.now();
}

// Encode the secret key as bytes
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload; // Return the decrypted payload
}
