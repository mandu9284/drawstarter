'use client'

import { Button } from '@/components/common/Button'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { PromptCard } from '@/components/home/PromptCard'
import { RecordItem } from '@/components/home/RecordItem'
import { getRandomPrompt } from '@/lib/prompt'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState(getRandomPrompt())
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [todayMinutes, setTodayMinutes] = useState(0)

  // localStorage는 클라이언트 컴포넌트에서만 사용할 수 있기 때문에 useEffect를 사용
  useEffect(() => {
    const storedMinutes = localStorage.getItem('totalMinutes')
    if (storedMinutes) {
      setTotalMinutes(parseInt(storedMinutes, 10))
    }

    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const storedTodayMinutes = localStorage.getItem(`day-${today}`)
    if (storedTodayMinutes) {
      setTodayMinutes(parseInt(storedTodayMinutes, 10))
    }
  }, [])

  return (
    <div className='space-y-6 px-4 sm:px-6 md:px-8'>
      <PromptCard prompt={prompt} />
      <RecordItem
        label='총 누적 시간'
        value={totalMinutes}
      />
      <RecordItem
        label='오늘의 작업 시간'
        value={todayMinutes}
      />
      <ButtonGroup>
        <Button
          variant='secondary'
          onClick={() => setPrompt(getRandomPrompt())}>
          다른 주제 보기
        </Button>
        <Link href='/draw'>
          <Button
            variant='primary'
            className='w-full'>
            그리기 시작
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  )
}
