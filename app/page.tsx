"use client";

import { getRandomPrompt } from "@/lib/prompt";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState(getRandomPrompt());
  return (
    <div className="space-y-6">
    <h1 className="text-3xl font-bold">DrawStarter</h1>
    <div className="border p-4 rounded bg-white shadow">
      <p className="font-semibold">오늘의 주제:</p>
      {/* 서버 컴포넌트에서 렌더링된 내용과 클라이언트 컴포넌트에서 렌더링된 내용이 다르기 때문에 suppressHydrationWarning을 사용 */}
      <p className="text-lg" suppressHydrationWarning>{prompt}</p>
    </div>
    <div className="flex gap-4">
      <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setPrompt(getRandomPrompt())}>다른 주제 보기</button>
      <Link href="/draw" className="bg-blue-500 text-white px-4 py-2 rounded">그리기 시작</Link>
    </div>
  </div>
  );
}
