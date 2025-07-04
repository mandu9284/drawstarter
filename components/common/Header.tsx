'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'

export function Header() {
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

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0]

  // Close dropdown when clicking outside
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

  return (
    <header className='text-center py-4 border-b flex justify-between items-center px-4'>
      <Link href={pathname ? `/${currentLocale}` : '/'}>
        <h1 className='text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity'>
          🎨 DrawStarter
        </h1>
      </Link>
      <div
        className='relative'
        ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          aria-haspopup='true'
          aria-expanded={isOpen}>
          <FaGlobe className='text-lg' />
          <span className='text-sm font-medium'>
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <IoMdArrowDropdown
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

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
    </header>
  )
}
