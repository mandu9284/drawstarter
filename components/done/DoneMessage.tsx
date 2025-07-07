'use client'

import { Dictionary } from '@/types/type'

export function DoneMessage({ dict }: { dict: Dictionary }) {
  return (
    <div className='space-y-6 text-center px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-bold'>{dict.done.title}</h2>
      <p className='text-lg sm:text-xl'>{dict.done.description}</p>
      <p className='text-sm sm:text-base text-gray-500'>{dict.done.thanks}</p>
    </div>
  )
}
