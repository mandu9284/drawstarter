import { useState, useEffect, useRef, useCallback } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'

const DEFAULT_MINUTE = 30
const DEFAULT_SECOND = DEFAULT_MINUTE * 60

export function useTimer() {
  const { user } = useUser()
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SECOND)
  const [isRunning, setIsRunning] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const saveData = useCallback(
    async (minutes: number) => {
      if (!user) return

      const { error } = await supabase.from('time_logs').insert({
        user_id: user.id,
        duration_minutes: minutes,
      })

      if (error) {
        console.error('Error saving time log:', error)
      }
    },
    [user],
  )

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(DEFAULT_SECOND)
    setHasCompleted(false)
  }, [])

  const completeNow = useCallback(() => {
    setIsRunning(false)
    const spentMinutes = Math.floor((DEFAULT_SECOND - timeLeft) / 60)
    if (spentMinutes > 0) {
      saveData(spentMinutes)
    }
    setHasCompleted(true)
  }, [timeLeft, saveData])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && !hasCompleted) {
      completeNow()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeLeft, isRunning, hasCompleted, completeNow])

  return {
    timeLeft,
    isRunning,
    hasCompleted,
    toggleTimer,
    resetTimer,
    completeNow,
  }
}
