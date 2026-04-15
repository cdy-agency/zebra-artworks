import type { Metadata } from "next";
import { Nunito, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/WhatsAppButton";


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ZAG Rwanda",
  description: "Construction, Interior Design & Architecture Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        nunito.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="min-h-full flex flex-col">

        {children}

        {/* 🌐 WhatsApp Floating Button (GLOBAL) */}
        <WhatsAppButton />

      </body>
    </html>
  );
}