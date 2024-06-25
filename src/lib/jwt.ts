import { SignJWT, jwtVerify } from "jose";

// Define a secret key for JWT encryption
const secretKey = process.env.AUTH_SECRET;

if (!secretKey || typeof secretKey !== "string" || secretKey.length < 32) {
  throw new Error("AUTH_SECRET is not defined");
}

export function freshExpiryDate() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
}

// Encode the secret key as bytes
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Set the algorithm for JWT signing
    .setIssuedAt() // Set the issuance time of the JWT
    .setExpirationTime("7 day from now") // Set the expiration time of the JWT
    .sign(key); // Sign the JWT using the secret key
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"], // Specify the allowed algorithms for JWT verification
  });
  return payload; // Return the decrypted payload
}
