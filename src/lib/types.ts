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

export interface AnalyticsOverviewData {
  totalClicks: number;
  totalLinks: number;
  avgClicksPerLink: number;
}

export interface AnalyticsOverviewResponse {
  success: boolean;
  data?: AnalyticsOverviewData;
  message?: string;
}

export type ShortenRequest = {
  originalUrl: string;
  shortCode?: string;
  expiration?: number; // Unix timestamp
  description?: string;
};

export type ShortenResponse = {
  shortUrl: string;
  originalUrl?: string;
  success?: boolean;
  message?: string; // used for error
};

export type AuthResponse = {
  success: boolean;
  url_shortener_gh_session: string;
  message?: string;
};

export type AuthenticateUserResult = {
  success: boolean;
  message?: string;
};

export interface AnalyticsResponseType {
  success: boolean;
  urlId: string;
  shortCodes: {
    [key: string]: Array<{ date: string; count: number }>;
  };
  totalClicks: number;
}
