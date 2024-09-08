import { createHash, randomBytes } from "crypto";
import { TEN } from "../constants";

// Generate a random salt
const salt = randomBytes(TEN).toString("hex");

/**
 * Basic encryption adapter for password hashing and comparison.
 * Here you can use any encryption library you want.
 */
export const basicEncrypt = {
  /**
   * Generates a hash for a password with a salt.
   * @param password - The password to hash.
   * @returns - The hashed password.
   */
  hashPassword: (password: string): string => {
    const hash = createHash("sha256")
      .update(salt + password)
      .digest("hex");

    return hash;
  },

  comparePassword: (password: string, hash: string): boolean => {
    const newHash = createHash("sha256")
      .update(salt + password)
      .digest("hex");

    return newHash === hash;
  },
};
