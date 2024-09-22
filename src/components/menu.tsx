"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <Link href="/dashboard">
        <Button
          variant={pathname === "/dashboard" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/dashboard/management">
        <Button
          variant={
            pathname.startsWith("/dashboard/management") ? "default" : "ghost"
          }
          className="w-full justify-start"
        >
          Management
        </Button>
      </Link>
      <Link href="/dashboard/analytics">
        <Button
          variant={
            pathname.startsWith("/dashboard/analytics") ? "default" : "ghost"
          }
          className="w-full justify-start"
        >
          Analytics
        </Button>
      </Link>
    </div>
  );
};
