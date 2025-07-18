'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useDictionary } from '@/hooks/useDictionary'
import { Button } from '@/components/common/Button'

export default function ChangePasswordPage() {
  const { dict } = useDictionary()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
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
      setMessage(dict.settings.password_update_success)
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className='flex flex-col items-center py-2'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        {dict.settings.change_password_title}
      </h1>

      <form
        onSubmit={handlePasswordChange}
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
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2'
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
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2'
          required
        />

        <div className='flex flex-col md:flex-row gap-4 mt-8 items-stretch w-full'>
          <Button
            disabled={loading}
            onClick={() => {
              setNewPassword('')
              setConfirmPassword('')
            }}
            variant='secondary'>
            {dict.draw.reset}
          </Button>

          <Button
            type='submit'
            variant='primary'
            disabled={loading}>
            {loading
              ? dict.settings.saving
              : dict.settings.change_password_button}
          </Button>
        </div>
        {message && <p className='mt-4 text-sm text-red-500'>{message}</p>}
      </form>
    </div>
  )
}
