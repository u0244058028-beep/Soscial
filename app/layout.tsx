import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySocialBomb - 10x Your Social Media Engagement with AI",
  description: "AI-powered content generation that grows your followers, engagement, and sales. Start your 14-day free trial today.",
  keywords: "social media AI, content generator, instagram growth, tiktok ai, social media marketing",
  openGraph: {
    title: "MySocialBomb - 10x Your Social Media Engagement",
    description: "AI-powered content that actually works. Get more followers, engagement, and sales.",
    type: "website",
    url: "https://mysocialbomb.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}