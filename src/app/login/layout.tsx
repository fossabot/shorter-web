import { Toaster } from "@/components/ui/toaster";

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
