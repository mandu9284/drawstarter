'use client'

import { TimerControls } from '@/components/draw/TimerControls'
import { TimerDisplay } from '@/components/draw/TimerDisplay'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'

export default function DrawPage() {
  const router = useRouter()

  const {
    timeLeft,
    isRunning,
    toggleTimer,
    resetTimer,
    completeNow,
    hasCompleted,
  } = useTimer()

  useEffect(() => {
    if (hasCompleted) {
      router.push('/done')
    }
  }, [hasCompleted, router])

  return (
    <div className='space-y-6 text-center px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-semibold'>⏱️ 타이머</h2>
      <TimerDisplay time={timeLeft} />
      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
        onComplete={() => {
          completeNow()
          router.push('/done')
        }}
      />
    </div>
  )
}
