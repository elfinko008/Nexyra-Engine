import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nexyra Engine — AI Script Generation",
  description:
    "Generate production-ready scripts in seconds. Powered by Nexyra Labs.",
  openGraph: {
    title: "Nexyra Engine",
    description: "AI-powered script generation by Nexyra Labs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}