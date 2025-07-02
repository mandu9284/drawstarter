'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className='text-center py-4 border-b'>
      <Link href='/'>
        <h1 className='text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity'>
          🎨 DrawStarter
        </h1>
      </Link>
    </header>
  )
}
