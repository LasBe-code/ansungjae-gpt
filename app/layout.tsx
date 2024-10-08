import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

/**
 * @todo
 * 1. 공유 이미지
 * 2. 복사
 * 3. refactoring
 * 4. loading
 */

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--noto",
});

export const metadata: Metadata = {
  title: "안성재 GPT",
  description: "안성재의 요리평가 GPT",
  keywords: "흑백요리사, 넷플릭스, 안성재, 최현석, chat gpt, 안성재 gpt",
  openGraph: {
    title: "안성재 GPT",
    description: "안성재의 요리평가 GPT",
    siteName: "안성재 GPT",
    locale: "ko_KR",
    type: "website",
    url: "https://ansungjae-gpt.vercel.app",
    images: {
      url: "/og-image.jpg",
    },
  },
  verification: {
    google: "RQaBKYjPK-yLbYaaNsTGRCRN1K5zFG3_gL5x4aZy_Ig",
    other: {
      "naver-site-verification": "c3f944cef68f4f343b0b8113875b477bf14d5398",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
