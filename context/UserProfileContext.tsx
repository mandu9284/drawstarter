'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserProfile } from '@/types/userType'
import { getUserProfile } from '@/lib/supabaseQueries'
import { useUser } from '@/hooks/useUser'

interface UserProfileContextType {
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile | null) => void
}

export const UserProfileContext = createContext<UserProfileContextType | null>(
  null,
)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getUserProfile(user.id).then((profile) => {
        if (!profile) {
          return
        }
        const userName = profile.user_name
        const profilePictureUrl = profile.profile_picture_url

        setUserProfile({
          userName,
          profilePictureUrl,
        })
      })
    }
  }, [user])

  return (
    <UserProfileContext value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext>
  )
}
