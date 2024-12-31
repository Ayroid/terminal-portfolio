import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/themes/theme-provider";

export const metadata: Metadata = {
  title: "Ayroid",
  description: "Terminal resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
