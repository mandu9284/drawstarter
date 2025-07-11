'use client'

import { UserProfileContext } from '@/context/UserProfileContext'
import { useContext } from 'react'

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}
