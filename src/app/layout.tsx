import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "A url shortener developed by Haomin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}