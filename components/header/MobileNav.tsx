import Link from 'next/link'
import { Button } from '../common/Button'
import { FaBars } from 'react-icons/fa'
import { User } from '@supabase/supabase-js'
import { Dictionary } from '@/types/type'

export default function MobileNav({
  user,
  isMobileMenuOpen,
  dict,
  currentLocale,
  setIsMobileMenuOpen,
  handleLogout,
}: {
  user: User | null
  isMobileMenuOpen: boolean
  dict: Dictionary
  currentLocale: string
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void
  handleLogout: () => void
}) {
  return (
    <>
      <div className='md:hidden'>
        <Button
          variant='tertiary'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2'
          aria-controls='mobile-menu'
          aria-expanded={isMobileMenuOpen}>
          <FaBars className='text-lg' />
        </Button>
      </div>
      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          className='absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md md:hidden z-40'>
          <nav className='flex flex-col gap-2 p-2'>
            {user && (
              <>
                <div className='flex items-center justify-center'>
                  <span>{user.email}</span>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
              </>
            )}

            <Link href={`/${currentLocale}/settings`}>
              <Button
                variant='tertiary'
                size='sm'
                onClick={() => setIsMobileMenuOpen(false)}>
                {dict.header.settings}
              </Button>
            </Link>
            <div className='border-t border-gray-200 dark:border-gray-700'></div>
            {user ? (
              <Button
                variant='tertiary'
                onClick={handleLogout}
                size='sm'>
                {dict.auth.logout}
              </Button>
            ) : (
              <Link
                href={`/${currentLocale}/login`}
                onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant='tertiary'
                  size='sm'>
                  {dict.auth.login}
                </Button>
              </Link>
            )}
            <div className='border-t border-gray-200 dark:border-gray-700'></div>
            <Link
              href={`/${currentLocale}/terms`}
              onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant='tertiary'
                size='sm'>
                {dict.header.terms}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
