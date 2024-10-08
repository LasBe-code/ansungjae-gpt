import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

/**
 * @todo
 * 1. 메타데이타
 * 2. robot
 * 3. search console
 * 4. footer
 * 5. refactoring
 * 6. loading
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
  verification: {
    google: "RQaBKYjPK-yLbYaaNsTGRCRN1K5zFG3_gL5x4aZy_Ig",
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
