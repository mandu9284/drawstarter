
'use client'
import { useState } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/common/Button'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const { dict, lang } = useDictionary()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

  const handleSignUp = async () => {
    if (!termsAccepted) {
      setAuthMessage(dict.auth.agree_terms_signup_required)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setAuthMessage(error.message)
    } else {
      setAuthMessage(dict.auth.signup_complete_check_email)
      redirect(`/${lang}`)
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setAuthMessage(error.message)
    } else {
      redirect(`/${lang}`)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setAuthMessage(dict.auth.email_required_for_reset)
      return
    }
    setAuthMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${lang}/update-password`,
    })
    if (error) {
      setAuthMessage(`${dict.auth.reset_password_error}: ${error.message}`)
    } else {
      setAuthMessage(dict.auth.reset_password_success)
    }
  }

  return (
    <div className='w-full max-w-md p-8 mx-auto space-y-4 text-center border rounded-lg'>
      <h2 className='text-2xl font-bold'>
        {isSignUp ? dict.auth.signup : dict.auth.login}
      </h2>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict.auth.email}
        className='w-full px-4 py-2 border rounded-md'
      />
      {!showResetPassword && (
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={dict.auth.password}
          className='w-full px-4 py-2 border rounded-md'
        />
      )}
      {isSignUp && (
        <div className='flex items-center justify-center'>
          <input
            type='checkbox'
            id='terms'
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className='mr-2'
          />
          <label
            htmlFor='terms'
            className='text-sm'>
            <a
              href={`/${lang}/terms`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'>
              {dict.auth.terms_and_conditions}
            </a>
            <span className={lang === 'en' ? 'ml-2' : ''}>
              {dict.auth.i_agree}
            </span>
          </label>
        </div>
      )}
      <Button onClick={showResetPassword ? handleResetPassword : (isSignUp ? handleSignUp : handleLogin)}>
        {showResetPassword ? dict.auth.send_reset_email : (isSignUp ? dict.auth.signup : dict.auth.login)}
      </Button>
      {!isSignUp && (
        <p className='text-sm'>
          <button
            onClick={() => setShowResetPassword(!showResetPassword)}
            className='text-blue-500 hover:underline'>
            {showResetPassword ? dict.auth.back_to_login : dict.auth.forgot_password}
          </button>
        </p>
      )}
      <p className='text-sm'>
        {isSignUp
          ? dict.auth.already_have_account
          : dict.auth.dont_have_account}
        <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setShowResetPassword(false)
          }}
          className='ml-1 text-blue-500 hover:underline'>
          {isSignUp ? dict.auth.login : dict.auth.signup}
        </button>
      </p>
      {authMessage && <p className='text-red-500'>{authMessage}</p>}
    </div>
  )
}
