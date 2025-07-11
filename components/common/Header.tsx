'use client'

import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'
import { languages } from '@/types/dictionaryType'
import { Dictionary } from '@/types/dictionaryType'
import DesktopNav from '../header/DesktopNav'
import MobileNav from '../header/MobileNav'
import { useUserProfile } from '@/hooks/useUserProfile'

export function Header({ dict }: { dict: Dictionary }) {
  const { user } = useUser()
  const { userProfile } = useUserProfile()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = pathname?.split('/')[1] || 'en'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
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
      setIsMobileMenuOpen(false)
      setIsOpen(false)
      redirect(`/${currentLocale}`)
    }
  }

  return (
    <header
      ref={headerRef}
      className='relative text-center py-4 border-b border-gray-400 dark:border-gray-700 flex justify-between items-center px-4'>
      <Link href={pathname ? `/${currentLocale}` : '/'}>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white hover:opacity-80 transition-opacity'>
          🎨 DrawStarter
        </h1>
      </Link>
      <DesktopNav
        user={user}
        profile={userProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dropdownRef={dropdownRef}
        dict={dict}
        currentLocale={currentLocale}
        languages={languages}
        handleLogout={handleLogout}
        redirectedPathName={redirectedPathName}
      />
      <MobileNav
        user={user}
        profile={userProfile}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        dict={dict}
        currentLocale={currentLocale}
        handleLogout={handleLogout}
        languages={languages}
        redirectedPathName={redirectedPathName}
      />
    </header>
  )
}
