"use client"

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DEFAULT_TIME = 25 * 60; // 25분

export default function DrawPage() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 || !hasCompleted) {
      setIsRunning(false);
      setHasCompleted(true);
      if (hasCompleted) {
        alert("⏰ 타이머가 완료되었습니다! 수고하셨어요 🙌");
        router.push("/");
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isRunning]);

  const toggleTimer = () => { setIsRunning(!isRunning); }
  const resetTimer = () => { setIsRunning(false); setTimeLeft(DEFAULT_TIME); }
  const completeNow = () => { setIsRunning(false); setTimeLeft(0); }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">⏱️ 타이머</h2>
      <p className="text-6xl font-mono">{formatTime(timeLeft)}</p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleTimer}>
          {isRunning ? "PAUSE" : "START"}
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={resetTimer}>RESTART</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={completeNow}>COMPLETE</button>
      </div>
    </div>
  )
}
