import { useState, useEffect, useRef, useCallback } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'

const DEFAULT_MINUTE = 30
const DEFAULT_SECOND = DEFAULT_MINUTE * 60

export function useTimer() {
  const { user } = useUser()
  const [initialTime, setInitialTime] = useState(DEFAULT_SECOND)
  const [timeLeft, setTimeLeft] = useState(initialTime)
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
    setTimeLeft(initialTime)
    setHasCompleted(false)
  }, [initialTime])

  const completeNow = useCallback(() => {
    setIsRunning(false)
    const spentMinutes = Math.floor((initialTime - timeLeft) / 60)
    if (spentMinutes > 0) {
      saveData(spentMinutes)
    }
    setHasCompleted(true)
  }, [initialTime, timeLeft, saveData])

  const setTime = useCallback((minutes: number) => {
    const newTime = minutes * 60
    setInitialTime(newTime)
    setTimeLeft(newTime)
  }, [])

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

  useEffect(() => {
    setTimeLeft(initialTime)
  }, [initialTime])

  return {
    timeLeft,
    isRunning,
    hasCompleted,
    toggleTimer,
    resetTimer,
    completeNow,
    setTime,
  }
}
