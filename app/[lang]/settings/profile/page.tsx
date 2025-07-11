'use client'
import ProfileEditForm from '@/components/settings/ProfileEditForm'
import { useDictionary } from '@/hooks/useDictionary'

export default function ProfileEditPage() {
  const { dict } = useDictionary()
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>{dict.settings.profile_title}</h1>
      <ProfileEditForm />
    </div>
  )
}
