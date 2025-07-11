'use client'

import { supabase } from '@/lib/supabaseClient'
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface UserContextType {
  user: User | null
  loading: boolean
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        } else {
          setUser(session?.user ?? null)
        }
        setLoading(false)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <UserContext value={{ user, loading }}>{children}</UserContext>
}
