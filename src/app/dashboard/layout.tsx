'use client';

import { LogoutButton } from "@/components/logout-button";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import '../globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-zinc-900">
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-4">
          <svg
            className=" h-8 w-8 "
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Analytics Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
          variant="secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          <LogoutButton />
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:block absolute right-0 w-2/3 lg:relative lg:w-64 border-l border-r border-b border-gray-300 overflow-auto bg-white dark:bg-zinc-900 z-10`}
        >
          <nav className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-semibold ">
              Menu
            </h2>
            <Menu />
          </nav>
        </aside>
        <main className="flex-grow overflow-auto  dark:bg-zinc-900">{children}

        <footer className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2024 Haomin
        </p>
      </footer>
        </main>
        
      </div>
      
      <Toaster />
    </div>
  );
}
