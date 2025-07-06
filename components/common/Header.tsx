'use client'

import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Button } from './Button'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'

export function Header({ dict }: { dict: Dictionary }) {
  const { user } = useUser()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = pathname?.split('/')[1] || 'en'

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      redirect(`/${currentLocale}`)
    }
  }

  return (
    <header className='text-center py-4 border-b flex justify-between items-center px-4'>
      <Link href={pathname ? `/${currentLocale}` : '/'}>
        <h1 className='text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity'>
          🎨 DrawStarter
        </h1>
      </Link>
      <nav className='flex items-center gap-2'>
        {user ? (
          <Link
            href={`/${currentLocale}/login`}
            onClick={handleLogout}>
            <Button
              variant='tertiary'
              className='px-4 py-2 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
              {dict.auth.logout}
            </Button>
          </Link>
        ) : (
          <Link href={`/${currentLocale}/login`}>
            <Button
              variant='tertiary'
              className='px-4 py-2 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
              {dict.auth.login}
            </Button>
          </Link>
        )}
        <div
          className='relative'
          ref={dropdownRef}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant='tertiary'
            className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            aria-haspopup='true'
            aria-expanded={isOpen}>
            <FaGlobe className='text-lg' />
            <IoMdArrowDropdown
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </Button>

          {isOpen && (
            <div className='absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50'>
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={redirectedPathName(language.code)}
                  className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  onClick={() => setIsOpen(false)}>
                  <span className='mr-2'>{language.flag}</span>
                  {language.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
