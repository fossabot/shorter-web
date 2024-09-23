"use server";

import { cookies } from "next/headers";

type ShortenRequest = {
  originalUrl: string;
  shortCode?: string;
  expiration?: number; // Unix timestamp
  description?: string;
}

type ShortenResponse = {
  shortUrl: string;
  originalUrl?: string;
  success?: boolean;
  message?: string; // used for error
};

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
  const requestData:ShortenRequest = {originalUrl: url};  // Change this to an object


  const shortCode = formData.get("shortCode") as string;
  if (shortCode) {
    requestData.shortCode = shortCode;  // Use dot notation
  }

  const expirationDate = formData.get("expirationDate") as string;
  if (expirationDate) {
    if (isNaN(Date.parse(expirationDate))) {
      return { success: false, message: "Invalid expiration date" } as ShortenResponse;
    }

    requestData.expiration = new Date(expirationDate).getTime();  // Use dot notation
  }

  const description = formData.get("description") as string;
  if (description) {
    if (description.length > 100) {
      return {
        success: false,
        message: "Description must be 500 characters or less",
      } as ShortenResponse;
    }
    requestData.description = description;    // Use dot notation
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
      return { success: false, message: "An unknown error occurred" } as ShortenResponse;
    }
  }
}
