"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { ShortenResponse, ShortenRequest, AuthenticateUserResult, AuthResponse, AnalyticsResponseType } from "./types";

export async function shortenUrl(formData: FormData) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("url_shortener_gh_session");

  if (!sessionId) {
    return { success: false, message: "Not authenticated" } as ShortenResponse;
  }

  // Validate form data
  if (!formData.get("url")) {
    return { success: false, message: "URL is required" } as ShortenResponse;
  }

  const url = formData.get("url") as string;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return {
      success: false,
      message: "URL must start with http:// or https://",
    } as ShortenResponse;
  }
  const requestData: ShortenRequest = { originalUrl: url }; // Change this to an object

  const shortCode = formData.get("shortCode") as string;
  if (shortCode) {
    requestData.shortCode = shortCode; // Use dot notation
  }

  const expirationDate = formData.get("expirationDate") as string;
  if (expirationDate) {
    if (Number.isNaN(Date.parse(expirationDate))) {
      return {
        success: false,
        message: "Invalid expiration date",
      } as ShortenResponse;
    }

    requestData.expiration = new Date(expirationDate).getTime(); // Use dot notation
  }

  const description = formData.get("description") as string;
  if (description) {
    if (description.length > 100) {
      return {
        success: false,
        message: "Description must be 500 characters or less",
      } as ShortenResponse;
    }
    requestData.description = description; // Use dot notation
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shorten`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `url_shortener_gh_session=${sessionId.value}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    const data: ShortenResponse = await response.json();

    console.log("shortenUrl success, ", data);
    return data;
  } catch (error: unknown) {
    console.error("Error in shortenUrl:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message } as ShortenResponse;
    } else {
      return {
        success: false,
        message: "An unknown error occurred",
      } as ShortenResponse;
    }
  }
}

async function sendRequest(code: string) {
  console.log("Server-actions sendRequest to /auth/callback, code is", code);
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
}

// New Server Action to handle authentication
export async function authenticateUser(code: string) {
  console.log("authenticateUser called with code:", code);

  // Check if the authentication has already been performed
  const existingSession = cookies().get("url_shortener_gh_session");
  if (existingSession) {
    console.log("Session already exists, skipping authentication");
    return { success: true, message: "Already authenticated" };
  }

  if (!code) {
    console.log("no code provided.");
    return {
      success: false,
      message: "no code provided callback",
    } as AuthenticateUserResult;
  }

  try {
    const response = await sendRequest(code);
    const data: AuthResponse = await response.json();
    console.log("Authentication response:", data);

    if (data.success) {
      console.log("Authentication successful. Setting cookie...");

      // Set the cookie
      cookies().set("url_shortener_gh_session", data.url_shortener_gh_session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return {
        success: true,
        message: "Authentication successful",
      } as AuthenticateUserResult;
    } else {
      console.log("Authentication failed. ", data.message);
      return {
        success: false,
        message: data.message || "Authentication failed",
      } as AuthenticateUserResult;
    }
  } catch (error: unknown) {
    console.error("Error during authentication:", error);
    return {
      success: false,
      message: "Authentication failed",
    } as AuthenticateUserResult;
  }
}


export const getAnalytics = cache(
  async (urlId: string): Promise<AnalyticsResponseType> => {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("url_shortener_gh_session");

    if (!sessionId) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/url/${urlId}`,
      {
        headers: {
          Cookie: `url_shortener_gh_session=${sessionId.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch analytics data");
    }

    const data: AnalyticsResponseType = await response.json();
    return data;
  }
);
