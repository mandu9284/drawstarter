import type { Metadata } from "next";
import "@/styles/globals.css";

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
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <main className="max-w-md mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
