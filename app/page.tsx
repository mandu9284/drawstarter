"use client";

import { getRandomPrompt } from "@/lib/prompt";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState(getRandomPrompt());
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);

  // localStorage는 클라이언트 컴포넌트에서만 사용할 수 있기 때문에 useEffect를 사용
  useEffect(() => {
    const storedMinutes = localStorage.getItem("totalMinutes");
    if (storedMinutes) {
      setTotalMinutes(parseInt(storedMinutes, 10));
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const storedTodayMinutes = localStorage.getItem(`day-${today}`);
    if (storedTodayMinutes) {
      setTodayMinutes(parseInt(storedTodayMinutes, 10));
    }
  }, []);

  return (
    <div className="space-y-6">
    <h1 className="text-3xl font-bold">DrawStarter</h1>
    <div className="border p-4 rounded bg-white shadow dark:bg-gray-800">
      <p className="font-semibold dark:text-white ">오늘의 주제:</p>
      {/* 서버 컴포넌트에서 렌더링된 내용과 클라이언트 컴포넌트에서 렌더링된 내용이 다르기 때문에 suppressHydrationWarning을 사용 */}
      <p className="text-lg dark:text-white" suppressHydrationWarning>{prompt}</p>
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>총 누적 시간: {totalMinutes}분</p>
        <p>오늘의 작업 시간: {todayMinutes}분</p>
      </div>
    <div className="flex gap-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded dark:bg-green-600" onClick={() => setPrompt(getRandomPrompt())}>다른 주제 보기</button>
      <Link href="/draw" className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-600">그리기 시작</Link>
    </div>
  </div>
  );
}
