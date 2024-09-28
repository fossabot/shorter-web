import { Toaster } from "@/components/ui/toaster";
import "../globals.css"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}
    <Toaster />
    </div>
  );
}
