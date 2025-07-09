'use client'
import { Button } from '@/components/common/Button'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { PromptCard } from '@/components/home/PromptCard'
import { RecordItem } from '@/components/home/RecordItem'
import { useDictionary } from '@/hooks/useDictionary'
import { useUser } from '@/hooks/useUser'
import { getRandomPrompt } from '@/lib/prompt'
import { supabase } from '@/lib/supabaseClient'
import { SupportedLanguage } from '@/types/type'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return lang === 'en' || lang === 'ja' || lang === 'kr'
}

export default function Page() {
  const { dict, lang } = useDictionary()
  const { user, loading } = useUser()

  const currentLang: SupportedLanguage = isSupportedLanguage(lang) ? lang : 'en' // Default to 'en' if lang is not supported

  const [prompt, setPrompt] = useState(getRandomPrompt(currentLang))
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [todayMinutes, setTodayMinutes] = useState(0)

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

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='w-full max-w-4xl p-8 space-y-4'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold'>{dict.landing.title}</h1>
            <p className='mt-4 text-lg'>{dict.landing.subtitle}</p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='p-6 border rounded-lg'>
              <h3 className='text-2xl font-bold'>
                {dict.landing.feature_1_title}
              </h3>
              <p className='mt-2'>{dict.landing.feature_1_description}</p>
            </div>
            <div className='p-6 border rounded-lg'>
              <h3 className='text-2xl font-bold'>
                {dict.landing.feature_2_title}
              </h3>
              <p className='mt-2'>{dict.landing.feature_2_description}</p>
            </div>
            <div className='p-6 border rounded-lg'>
              <h3 className='text-2xl font-bold'>
                {dict.landing.feature_3_title}
              </h3>
              <p className='mt-2'>{dict.landing.feature_3_description}</p>
            </div>
          </div>
        </div>
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
          onClick={() => setPrompt(getRandomPrompt(currentLang))}>
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
    </div>
  )
}
