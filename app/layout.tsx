import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Veterinary Clinic v3",
  description: "Veterinary clinic management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ cn('min-h-screen bg-blue-500 font-sans', 
        fontSans.variable) }
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="white"
        >
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
