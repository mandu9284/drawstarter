
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useDictionary } from '@/hooks/useDictionary'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const { dict, lang } = useDictionary()
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Supabase will automatically handle session update from URL tokens
    // We just need to ensure the user is logged in to update password
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        // If no user, redirect to login or show an error
        setMessage(dict.auth.not_logged_in_error)
        // Optionally redirect to login after a delay
        // setTimeout(() => router.push(`/${lang}/login`), 3000)
      }
    }
    checkUser()
  }, [dict, lang, router])

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (newPassword.length < 6) {
      setMessage(dict.settings.password_min_length_error)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage(dict.settings.password_match_error)
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    setLoading(false)

    if (error) {
      setMessage(`${dict.settings.password_update_error}: ${error.message}`)
    } else {
      setMessage(dict.settings.password_reset_success)
      setNewPassword('')
      setConfirmPassword('')
      // Optionally redirect to home or login after successful update
      // setTimeout(() => router.push(`/${lang}/login`), 3000)
    }
  }

  return (
    <div className='flex flex-col items-center py-2'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        {dict.auth.set_new_password_title}
      </h1>

      <form
        onSubmit={handlePasswordUpdate}
        className='flex flex-col items-start py-2 mt-4 w-full'>
        <label
          htmlFor='new-password'
          className='mr-2 md:mr-2'>
          {dict.settings.new_password_label}
        </label>
        <input
          type='password'
          id='new-password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2 bg-gray-700'
          required
        />

        <label
          htmlFor='confirm-password'
          className='mr-2 md:mr-2 mt-4'>
          {dict.settings.confirm_password_label}
        </label>
        <input
          type='password'
          id='confirm-password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2 bg-gray-700'
          required
        />

        <button
          type='submit'
          disabled={loading}
          className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'>
          {loading ? dict.settings.saving : dict.auth.set_new_password_button}
        </button>

        {message && <p className='mt-4 text-sm text-red-500'>{message}</p>}
      </form>
    </div>
  )
}
