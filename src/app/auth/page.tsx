"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { authenticateUser, AuthenticateUserResult } from "@/lib/server-actions";


export function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loginResult, setLoginResult] = useState<AuthenticateUserResult>();
  const code = searchParams.get("code");

  // useEffect(() => {
  //   const getResult = async () => {
  //     try {
  //       if (code) {
  //         const authResult = await authenticateUser(code);
  //         setLoginResult(authResult);
          // if (authResult.success) {
          //   // Redirect to dashboard after a short delay
          //   setTimeout(() => {
          //     router.push("/dashboard");
          //   }, 1000);
  //         }
  //       } else {
  //         setLoginResult({
  //           success: false,
  //           message: "No authentication code provided",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error during authentication:", error);
  //       setLoginResult({
  //         success: false,
  //         message: "An error occurred during authentication",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (loading) {
  //     getResult();
  //   }
  // }, [code, loading, router]);

  const performAuthentication = useCallback(async () => {
    if (!code) {
      setLoginResult({
        success: false,
        message: "No authentication code provided",
      });
      setLoading(false);
      return;
    }

    try {
      const authResult = await authenticateUser(code);
      setLoginResult(authResult);
      if (authResult.success) {
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setLoginResult({
        success: false,
        message: "An error occurred during authentication",
      });
    } finally {
      setLoading(false);
    }
  }, [code, router]);

  useEffect(() => {
    performAuthentication();
  }, [performAuthentication]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
              <h2 className="mt-4 text-2xl font-semibold">Authenticating...</h2>
              <p className="mt-2 text-muted-foreground">
                Please wait while we verify your credentials.
              </p>
            </div>
          ) : !loginResult?.success ? (
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
              <h2 className="mt-4 text-2xl font-semibold text-destructive">
                Authentication Failed
              </h2>
              <p className="mt-2 text-muted-foreground">
                {loginResult?.message || "We couldn't authenticate you. Please try again."}
              </p>
              <Button asChild className="mt-4">
                <Link href="/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-success mx-auto" />
              <h2 className="mt-4 text-2xl font-semibold text-success">
                Login Successful
              </h2>
              <p className="mt-2 text-muted-foreground">
                You have been successfully authenticated.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthCallbackPage;