'use client'

import { Button } from '@/components/common/Button'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { PromptCard } from '@/components/home/PromptCard'
import { RecordItem } from '@/components/home/RecordItem'
import { getRandomPrompt } from '@/lib/prompt'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const { user, loading } = useUser()
  const [prompt, setPrompt] = useState(getRandomPrompt())
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [todayMinutes, setTodayMinutes] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const fetchTimeData = useCallback(async () => {
    if (!user) return

    const { data: totalData, error: totalError } = await supabase
      .from('time_logs')
      .select('duration_minutes')
      .eq('user_id', user.id)

    if (totalError) {
      console.error('Error fetching total time:', totalError)
    } else {
      const total = totalData.reduce(
        (acc, cur) => acc + cur.duration_minutes,
        0,
      )
      setTotalMinutes(total)
    }

    const today = new Date().toISOString().slice(0, 10)
    const { data: todayData, error: todayError } = await supabase
      .from('time_logs')
      .select('duration_minutes')
      .eq('user_id', user.id)
      .eq('logged_at', today)

    if (todayError) {
      console.error('Error fetching today time:', todayError)
    } else {
      const todayTotal = todayData.reduce(
        (acc, cur) => acc + cur.duration_minutes,
        0,
      )
      setTodayMinutes(todayTotal)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchTimeData()
    }
  }, [user, fetchTimeData])

  const handleSignUp = async () => {
    if (!termsAccepted) {
      setAuthMessage('이용 약관에 동의해야 회원가입을 할 수 있습니다.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setAuthMessage(error.message)
    } else {
      setAuthMessage('회원가입 완료! 이메일을 확인하여 계정을 활성화해주세요.')
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setAuthMessage(error.message)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className='space-y-4 text-center'>
        <h2 className='text-2xl font-bold'>
          {isSignUp ? '회원가입' : '로그인'}
        </h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일'
          className='w-full px-4 py-2 border rounded-md'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호'
          className='w-full px-4 py-2 border rounded-md'
        />
        {isSignUp && (
          <div className='flex items-center justify-center'>
            <input
              type='checkbox'
              id='terms'
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className='mr-2'
            />
            <label htmlFor='terms' className='text-sm'>
              <a href='/terms' target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>이용 약관</a>에 동의합니다.
            </label>
          </div>
        )}
        <Button onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? '회원가입' : '로그인'}
        </Button>
        <p className='text-sm'>
          {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className='ml-1 text-blue-500 hover:underline'>
            {isSignUp ? '로그인' : '회원가입'}
          </button>
        </p>
        {authMessage && <p className='text-red-500'>{authMessage}</p>}
      </div>
    )
  }

  return (
    <div className='space-y-6 px-4 sm:px-6 md:px-8'>
      <PromptCard prompt={prompt} />
      <RecordItem
        label={`${user.email}님의 총 누적 시간`}
        value={totalMinutes}
      />
      <RecordItem
        label={`${user.email}님의 오늘의 작업 시간`}
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
      <Button
        variant='tertiary'
        onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  )
}
