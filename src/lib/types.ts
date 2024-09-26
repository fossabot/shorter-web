export type KVPair = {
  shortCode: string;
  originalUrl: string;
  expiration?: number; // Unix timestamp
  description?: string;
  urlId: string;
};

export type ListAllResponse = {
  success: boolean;
  message?: string;
  data?: KVPair[];
};
