export type KVPair = {
    shortCode: string;
    originalUrl: string;
    expiration?: number; // Unix timestamp
    description?: string;
  }