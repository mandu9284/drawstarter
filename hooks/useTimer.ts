import { useState, useEffect, useRef, useCallback } from 'react'

const DEFAULT_MINUTE = 30
const DEFAULT_SECOND = DEFAULT_MINUTE * 60

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SECOND)
  const [isRunning, setIsRunning] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const addToTotalMinutes = useCallback((mins: number) => {
    const prev = localStorage.getItem('totalMinutes')
    const total = (prev ? parseInt(prev, 10) : 0) + mins
    localStorage.setItem('totalMinutes', total.toString())
  }, [])

  const addToTodayMinutes = useCallback((mins: number) => {
    const today = new Date().toISOString().slice(0, 10)
    const prev = localStorage.getItem(`day-${today}`)
    const total = (prev ? parseInt(prev, 10) : 0) + mins
    localStorage.setItem(`day-${today}`, total.toString())
  }, [])

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
      addToTotalMinutes(spentMinutes)
      addToTodayMinutes(spentMinutes)
    }
    setHasCompleted(true)
  }, [timeLeft, addToTotalMinutes, addToTodayMinutes])

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
    addToTotalMinutes,
    addToTodayMinutes,
  }
}
