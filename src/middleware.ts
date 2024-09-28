import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type AuthStatusResponse = {
  isValid: boolean;
  success: boolean;
  error?: string;
};

async function checkAuthStatus(request: NextRequest) {
  const sessionCookie = request.cookies.get("url_shortener_gh_session");
  // console.log("checkAuthStatus Session cookie:", sessionCookie);
  if (!sessionCookie) {
    console.log("checkAuthStatus Session cookie not found");
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`,
      {
        headers: {
          Cookie: `url_shortener_gh_session=${sessionCookie.value}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`Authentication API returned status ${response.status}`);
      return false;
    }
    // console.log("checkAuthStatus Response:", response);
    const data: AuthStatusResponse = await response.json();
    // console.log("checkAuthStatus Data:", data);
    if (!data.success && !data.isValid) {
      console.log("checkAuthStatus Session cookie deleted");
    }
    return data.success && data.isValid;
  } catch (error) {
    console.error("Error validating session:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const isLoggedIn = await checkAuthStatus(request);

  console.log("Middleware: user is logged in:", isLoggedIn);

  // // List of public routes that don't require authentication
  // const publicRoutes = ["/login", "/auth/callback"];

  // // Check if the requested path is a public route
  // const isPublicRoute = publicRoutes.some((route) =>
  //   request.nextUrl.pathname.startsWith(route)
  // );

  if (!isLoggedIn) {
    // Redirect to login if not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue with the request if everything is fine
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
