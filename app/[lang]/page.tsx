'use client'
import { Button } from '@/components/common/Button'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { PromptCard } from '@/components/home/PromptCard'
import { RecordItem } from '@/components/home/RecordItem'
import { useDictionary } from '@/hooks/useDictionary'
import { useUser } from '@/hooks/useUser'
import { getRandomPrompt } from '@/lib/prompt'
import { supabase } from '@/lib/supabaseClient'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { dict, lang } = useDictionary()
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
      setAuthMessage(dict.auth.agree_terms_signup_required)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setAuthMessage(error.message)
    } else {
      setAuthMessage(dict.auth.signup_complete_check_email)
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
          {isSignUp ? dict.auth.signup : dict.auth.login}
        </h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.auth.email}
          className='w-full px-4 py-2 border rounded-md'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={dict.auth.password}
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
            <label
              htmlFor='terms'
              className='text-sm'>
              <a
                href={`/${lang}/terms`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'>
                {dict.auth.terms_and_conditions}
              </a>
              <span className={lang === 'en' ? 'ml-2' : ''}>
                {dict.auth.i_agree}
              </span>
            </label>
          </div>
        )}
        <Button onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? dict.auth.signup : dict.auth.login}
        </Button>
        <p className='text-sm'>
          {isSignUp
            ? dict.auth.already_have_account
            : dict.auth.dont_have_account}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className='ml-1 text-blue-500 hover:underline'>
            {isSignUp ? dict.auth.login : dict.auth.signup}
          </button>
        </p>
        {authMessage && <p className='text-red-500'>{authMessage}</p>}
      </div>
    )
  }

  return (
    <div className='space-y-6 px-4 sm:px-6 md:px-8'>
      <PromptCard
        prompt={prompt}
        todaySubject={dict.home.today_subject}
      />
      <RecordItem
        label={`${dict.auth.email}`}
        value={`${user.email}`}
      />
      <RecordItem
        label={`${dict.home.total_accumulated_time}`}
        value={`${totalMinutes} ${dict.home.minutes}`}
      />
      <RecordItem
        label={`${dict.home.today_work_time}`}
        value={`${todayMinutes} ${dict.home.minutes}`}
      />
      <ButtonGroup>
        <Button
          variant='secondary'
          onClick={() => setPrompt(getRandomPrompt())}>
          {dict.home.view_other_topics}
        </Button>
        <Link href={`/${lang}/draw`}>
          <Button
            variant='primary'
            className='w-full'>
            {dict.home.start_drawing}
          </Button>
        </Link>
      </ButtonGroup>
      <Button
        variant='tertiary'
        onClick={handleLogout}>
        {dict.auth.logout}
      </Button>
    </div>
  )
}
