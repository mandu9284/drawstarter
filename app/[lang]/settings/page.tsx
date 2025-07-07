'use client'

import { redirect } from 'next/navigation'
import { useDictionary } from '@/hooks/useDictionary'
import { languages } from '@/types/type'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const { dict, lang } = useDictionary()
  const { user } = useUser()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    redirect(`/${e.target.value}/settings`)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className='flex flex-col items-center py-2'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        {dict.header.settings}
      </h1>

      <div className='flex flex-col items-start py-2 mt-4 w-full'>
        <label
          htmlFor='language'
          className='mr-2 md:mr-2 text-lg font-semibold mb-2'>
          {dict.header.language_label}
        </label>
        <select
          name='language'
          id='language'
          onChange={handleLanguageChange}
          value={lang}
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2'>
          {languages.map((language) => (
            <option
              key={language.code}
              value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col items-start py-2 mt-4 w-full'>
        <h2 className='text-lg font-semibold mb-2'>
          {dict.settings.theme_label}
        </h2>
        <div className='flex gap-4'>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              className='form-radio'
              name='theme'
              value='light'
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            <span className='ml-2'>{dict.settings.light_mode}</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              className='form-radio'
              name='theme'
              value='dark'
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            <span className='ml-2'>{dict.settings.dark_mode}</span>
          </label>
        </div>
      </div>

      {user && (
        <div className='flex flex-col items-start py-2 mt-4 w-full'>
          <Link
            href={`/${lang}/settings/password`}
            className='text-blue-500 hover:underline'>
            {dict.settings.change_password_button}
          </Link>
        </div>
      )}
    </div>
  )
}
