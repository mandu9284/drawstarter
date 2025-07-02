"use client"

export function TimerDisplay({ time }: { time: number }) {
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  return <p className="text-5xl sm:text-6xl font-mono">{formatTime(time)}</p>;
}
