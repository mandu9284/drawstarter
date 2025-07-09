'use client'

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { getUserProfile, getUserProfileUrl } from '@/lib/supabaseQueries'
import { UserProfile } from '@/types/userType'

interface UserContextType {
  user: User | null
  loading: boolean
  profile: UserProfile | null
}


const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        } else {
          setUser(session?.user ?? null)
          const profile = await getUserProfile(session?.user?.id ?? '')
          if (profile) {
            const profileUrl = await getUserProfileUrl(profile.profile_picture_url)
            setProfile({
              userName: profile.user_name,
              profilePictureUrl: profileUrl.publicUrl,
            } as UserProfile)
          }
        }
        setLoading(false)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, profile }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
