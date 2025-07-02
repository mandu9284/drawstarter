"use client"

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SECOND = 25 * 60;
const DEFAULT_MINUTE = 25;

export default function DrawPage() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(DEFAULT_SECOND);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !hasCompleted) {
      setIsRunning(false);
      setHasCompleted(true);
      addToTotalMinutes(DEFAULT_MINUTE);
      addToTodayMinutes(DEFAULT_MINUTE);
      router.push("/done");
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isRunning, hasCompleted, router]);

  const toggleTimer = () => { setIsRunning(!isRunning); }
  const resetTimer = () => { setIsRunning(false); setTimeLeft(DEFAULT_SECOND); }
  const completeNow = () => {
    setIsRunning(false); 
    const spentMinutes = Math.floor((DEFAULT_SECOND - timeLeft) / 60);
    addToTotalMinutes(spentMinutes);
    addToTodayMinutes(spentMinutes);
    router.push("/done");
  }
  const addToTotalMinutes = (mins: number) => {
    const prev = localStorage.getItem("totalMinutes");
    const total = (prev ? parseInt(prev, 10) : 0) + mins;
    localStorage.setItem("totalMinutes", total.toString());
  }

  const addToTodayMinutes = (mins: number) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const prev = localStorage.getItem(`day-${today}`);
    const total = (prev ? parseInt(prev, 10) : 0) + mins;
    localStorage.setItem(`day-${today}`, total.toString());
  }

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
        <button className="bg-gray-200 px-4 py-2 rounded dark:bg-gray-700" onClick={resetTimer}>RESTART</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={completeNow}>COMPLETE</button>
      </div>
    </div>
  )
}
