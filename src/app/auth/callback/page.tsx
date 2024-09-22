"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

async function sendRequest(url: string, { code }: { code: string }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

type AuthResponse = {
  success: boolean;
  url_shortener_gh_session: string;
  error?: string;
};

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    
    if (!code) {
      setMessage("No code found. Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000);
      return;
    }

    sendRequest("/api/auth/callback", { code })
      .then((response) => response.json())
      .then((data: AuthResponse) => {
        if (data.success) {
          setMessage("Authentication successful. Redirecting to dashboard...");
          setTimeout(() => router.push("/dashboard"), 3000);
        } else {
          throw new Error(data.error || "Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
        setMessage(`Authentication failed: ${error.message}`);
        setTimeout(() => router.push("/login"), 3000);
      });
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}
