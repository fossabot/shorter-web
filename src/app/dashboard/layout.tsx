import { LogoutButton } from "@/components/logout-button";
import { Menu } from "@/components/menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-zinc-900">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-4">
          <svg
            className=" h-8 w-8 text-zinc-900 dark:text-zinc-50"
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
          <LogoutButton />
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 overflow-auto">
          <nav className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
              Menu
            </h2>
            <Menu />
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
      <footer className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2024 Haomin
        </p>
      </footer>
    </div>
  );
}
