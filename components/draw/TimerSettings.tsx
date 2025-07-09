'use client'

import { useState } from 'react'
import { Dictionary } from '@/types/type'
import { Button } from '../common/Button'

export function TimerSettings({
  onSetTime,
  dict,
}: {
  onSetTime: (minutes: number) => void
  dict: Dictionary
}) {
  const [minutes, setMinutes] = useState(30)

  const handleSetTime = () => {
    onSetTime(minutes)
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <input
        type="number"
        value={minutes}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10)
          setMinutes(isNaN(value) ? 0 : value)
        }}
        className="w-24 rounded-md border-gray-700 text-center border-1"
        min="1"
      />
      <span>{dict.draw.minutes}</span>
      <Button onClick={handleSetTime} variant="tertiary">{dict.draw.setTime}</Button>
    </div>
  )
}
