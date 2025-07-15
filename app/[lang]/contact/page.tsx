'use client'

import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { useDictionary } from '@/hooks/useDictionary'
import { supabase } from '@/lib/supabaseClient'

function ContactPage() {
  const { dict } = useDictionary()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }])

    if (error) {
      setError(error.message)
    } else {
      setIsSubmitted(true)
    }

    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className='mx-auto max-w-2xl text-center'>
        <h1 className='mb-4 text-2xl font-bold'>
          {dict.contact.submit_success_title}
        </h1>
        <p className='text-gray-600'>{dict.contact.submit_success_message}</p>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl'>
      <h1 className='mb-4 text-2xl font-bold'>{dict.contact.title}</h1>
      <p className='mb-8 text-gray-600'>{dict.contact.description}</p>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='mb-2 block text-sm font-medium text-gray-700'>
            {dict.contact.name}
          </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2 dark:border-gray-600'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='mb-2 block text-sm font-medium text-gray-700'>
            {dict.contact.email}
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2 dark:border-gray-600'
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='mb-2 block text-sm font-medium text-gray-700'>
            {dict.contact.message}
          </label>
          <textarea
            id='message'
            name='message'
            rows={4}
            required
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2 dark:border-gray-600'></textarea>
        </div>
        <Button
          type='submit'
          variant='primary'
          className='w-full md:w-auto'
          disabled={isSubmitting}>
          {isSubmitting ? dict.contact.submitting : dict.contact.submit}
        </Button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  )
}

export default ContactPage
