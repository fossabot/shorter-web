import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

type AuthResponse = {
  success: boolean;
  url_shortener_gh_session: string;
  message?: string;
};

async function sendRequest(code: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
}

// New Server Action to handle authentication
async function authenticateUser(code: string) {
  'use server'
  
  try {
    const response = await sendRequest(code);
    const data: AuthResponse = await response.json();
    console.log("Authentication response:", data);

    if (data.success) {
      console.log("Authentication successful. Setting cookie and redirecting to dashboard...");
      
      // Set the cookie
      cookies().set('url_shortener_gh_session', data.url_shortener_gh_session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return { success: true, message: "Authentication successful" };
    } else {
      console.log("Authentication failed. ", data.message);
      return { success: false, message: data.message || "Authentication failed" };
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return { success: false, message: "Authentication failed" };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code') || "";

  if (!code) {
    console.log("No code found. Redirecting to login...");
    redirect('/login');
  }

  const result = await authenticateUser(code);

  if (result.success) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}