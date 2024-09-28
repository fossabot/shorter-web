import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ListAllResponse } from "@/lib/types";

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("url_shortener_gh_session");

  if (!sessionCookie?.value) {
    return NextResponse.json({
      success: false,
      message: "No authentication",
    } as ListAllResponse);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/all`,
    {
      headers: {
        Cookie: `url_shortener_gh_session=${sessionCookie?.value || ""}`,
      },
    }
  );

  const data: ListAllResponse = await response.json();
  return NextResponse.json(data);
}
