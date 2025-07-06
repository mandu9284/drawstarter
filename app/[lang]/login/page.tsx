'use client'
import { useState } from 'react'
import { useDictionary } from '@/hooks/useDictionary'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/common/Button'
import { redirect } from 'next/navigation'

export default function Login() {
  const { dict, lang } = useDictionary()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

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
    }
    redirect(`/${lang}`)
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
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={dict.auth.password}
        className='w-full px-4 py-2 border rounded-md'
      />
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
      <Button onClick={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp ? dict.auth.signup : dict.auth.login}
      </Button>
      <p className='text-sm'>
        {isSignUp
          ? dict.auth.already_have_account
          : dict.auth.dont_have_account}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className='ml-1 text-blue-500 hover:underline'>
          {isSignUp ? dict.auth.login : dict.auth.signup}
        </button>
      </p>
      {authMessage && <p className='text-red-500'>{authMessage}</p>}
    </div>
  )
}
