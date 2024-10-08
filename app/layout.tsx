import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--noto",
});

export const metadata: Metadata = {
  title: "안성재 GPT",
  description: "안성재의 요리평가 GPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.variable}  antialiased`}>{children}</body>
    </html>
  );
}
