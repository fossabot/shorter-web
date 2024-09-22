import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // first check if there is a session cookie
  const sessionCookie = cookies().get("url_shortener_gh_session");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL));
  }

  try {
    // Call the /auth/logout endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionCookie.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Clear the session cookie
    cookies().delete("url_shortener_gh_session");

    // Redirect to login page
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL));
  } catch (error) {
    console.error("Error during logout:", error);
    // Even if there's an error, redirect to login
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL));
  }
}
