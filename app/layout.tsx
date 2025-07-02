import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/common/Header";

export const metadata: Metadata = {
  title: "Drawstarter",
  description: "Drawstarter",
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
