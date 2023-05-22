import { jwtVerify } from "jose";

export async function validateAndExtractJWT(token: string, key: string) {
  try {
    // Verify and decode the JWT
    const decoded = await jwtVerify(token, new TextEncoder().encode(key));

    // Return the extracted information
    return decoded.payload;
  } catch (error) {
    // Handle validation errors
    console.error("Invalid JWT:", error);
    throw new Error("Invalid JWT");
  }
}
