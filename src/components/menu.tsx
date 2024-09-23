"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/management", label: "Management" },
    { href: "/dashboard/analytics", label: "Analytics" },
  ];

  return (
    <div className="flex flex-col gap-1">
      {menuItems.map((item) => (
        <MenuButton
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href)}
        />
      ))}
    </div>
  );
};

interface MenuButtonProps {
  href: string;
  label: string;
  isActive: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ href, label, isActive }) => (
  <Link href={href}>
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
    >
      {label}
    </Button>
  </Link>
);
