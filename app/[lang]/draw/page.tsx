'use client'

import { TimerControls } from '@/components/draw/TimerControls'
import { TimerDisplay } from '@/components/draw/TimerDisplay'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { useDictionary } from '@/hooks/useDictionary'

export default function DrawPage() {
  const router = useRouter()
  const { dict, lang } = useDictionary()

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
      router.push(`/${lang}/done`)
    }
  }, [hasCompleted, router])

  return (
    <div className='space-y-6 text-center px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-semibold'>
        ⏱️ {dict.draw.timer}
      </h2>
      <TimerDisplay time={timeLeft} />
      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
        onComplete={() => {
          completeNow()
          router.push(`/${lang}/done`)
        }}
        dict={dict}
      />
    </div>
  )
}
