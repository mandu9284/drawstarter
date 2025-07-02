import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/common/Header";

export const metadata: Metadata = {
  title: "DrawStarter",
  description: "일러스트레이터를 위한 창작 주제 제안 & 타이머 도구",
  generator: "DrawStarter",
  applicationName: "DrawStarter",
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "일러스트레이션",
    "창작",
    "타이머",
    "그림",
    "일러스트레이터",
    "창작주제",
    "그림 시간",
    "timer",
    "art",
    "subject",
    "illustration",
    "illustrations",
    "creative",
    "draw",
    "drawings",
    "illustrator",
    "イラスト",
    "イラストレーション",
    "イラストレーター",
    "アート",
    "創作",
    "お絵描き",
    "タイマー"
  ],
  authors: [
    {
      name: "mandu",
      url: "https://github.com/mandu9284"
    }
  ],
  creator: "mandu",
  publisher: "mandu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://drawstarter.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ko-KR': '/ko-KR',
      'ja-JP': '/ja-JP',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <Header />
        <main className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
