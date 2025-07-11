'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { useDictionary } from '@/hooks/useDictionary'
import { Button } from '../common/Button'
import { useUserProfile } from '@/hooks/useUserProfile'
import {
  updateProfile,
  updateProfilePicture,
  upsertProfilePicture,
  deleteProfilePicture,
} from '@/lib/supabaseQueries'
import { SupabaseImage } from '../common/SupabaseImage'
import { AVATARS_BUCKET_ID } from '@/types/supabaseType'
import { FaMinus, FaUpload } from 'react-icons/fa'
import { z } from 'zod'
import { getUserNameSchema } from '@/schema/userNameSchema'
import Image from 'next/image'

export default function ProfileEditForm() {
  const { user, loading } = useUser()
  const { userProfile, setUserProfile } = useUserProfile()
  const { dict } = useDictionary()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const userNameSchema = getUserNameSchema({ dict })

  const [isValidUserName, setIsValidUserName] = useState<boolean>(true)
  const [userNameError, setUserNameError] = useState<string | null>(null)

  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.userName || '')
      setPreviewImage(
        userProfile.profilePictureUrl
          ? `${AVATARS_BUCKET_ID}/${userProfile.profilePictureUrl}`
          : null,
      )
    }
  }, [userProfile])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSubmitMessage('Please upload an image file')
      return
    }

    // Validate file size (max 2MB)
    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
    if (file.size > MAX_FILE_SIZE) {
      setSubmitMessage('Image size should be less than 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      if (event.target?.result && user) {
        const result = event.target.result as string
        const fileName = `${Date.now()}.${file.name.split('.').pop()}`
        const filePath = `${user.id}/${fileName}`

        await upsertProfilePicture(filePath, file)
        await updateProfilePicture(user.id, filePath)

        if (userProfile?.profilePictureUrl) {
          await deleteProfilePicture(userProfile.profilePictureUrl)
        }

        setUserProfile({
          userName,
          profilePictureUrl: filePath,
        })
        setPreviewImage(result)
        setSubmitMessage(`${dict.settings.profile_updated_successfully}`)
      }
    }
    reader.onerror = (error) => {
      console.error('Error reading the file:', error)
      setSubmitMessage('Error reading the file')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    if (!user) {
      setSubmitMessage(`${dict.settings.error_message_not_logged_in}`)
      setIsSubmitting(false)
      return
    }

    try {
      await updateProfile(user.id, userName)

      setUserProfile({
        userName,
        profilePictureUrl: userProfile?.profilePictureUrl || null,
      })

      setSubmitMessage(`${dict.settings.profile_updated_successfully}`)
    } catch (err) {
      console.error('Failed to submit profile:', err)
      setSubmitMessage(`${dict.settings.error_message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProfilePicture = async () => {
    const isConfirmed = window.confirm(
      `${dict.settings.delete_profile_picture_confirmation}`,
    )
    if (isConfirmed && userProfile?.profilePictureUrl) {
      try {
        await deleteProfilePicture(userProfile.profilePictureUrl)

        if (!user) {
          return
        }

        await updateProfilePicture(user.id, null)

        setUserProfile({
          userName,
          profilePictureUrl: null,
        })
      } catch (err) {
        console.error('Failed to delete profile picture:', err)
        setSubmitMessage(`${dict.settings.error_message}`)
      }
    }
  }

  if (loading) {
    return <div>{dict.settings.loading_user_data}</div>
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'>
      <div className='relative'>
        {previewImage && (
          <label
            htmlFor='deleteProfilePicture'
            className='absolute top-1 left-24 bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer'>
            <FaMinus size={8} />
            <button
              type='button'
              id='deleteProfilePicture'
              name='deleteProfilePicture'
              onClick={handleDeleteProfilePicture}
              hidden
            />
          </label>
        )}
        <label
          htmlFor='profileImage'
          className='text-xs font-semibold border border-gray-300 rounded-md p-2 absolute top-25 bg-gray-50 dark:bg-gray-700 cursor-pointer'>
          <FaUpload size={8} />
          <input
            type='file'
            id='profileImage'
            name='profileImage'
            accept='image/*'
            onChange={handleImageChange}
            hidden
          />
        </label>
        {previewImage ? (
          <SupabaseImage
            src={previewImage}
            alt='Profile Preview'
            width={128}
            height={128}
          />
        ) : (
          <Image
            src={'/default-avatar.png'}
            alt='Profile Preview'
            width={128}
            height={128}
          />
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='userName'
          className='block text-sm font-medium'>
          {dict.settings.username_label}
        </label>
        <input
          type='text'
          id='userName'
          name='userName'
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
            const result = userNameSchema.safeParse(e.target.value)
            setIsValidUserName(result.success)
            setUserNameError(
              result.error?.message ? z.prettifyError(result.error) : null,
            )
          }}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder={`${dict.settings.username_label}`}
          disabled={isSubmitting}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className='disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'
        disabled={isSubmitting || !isValidUserName}>
        {isSubmitting
          ? `${dict.settings.saving}`
          : `${dict.settings.save_profile}`}
      </Button>

      {submitMessage && (
        <p
          className={`mt-2 text-sm ${submitMessage.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {submitMessage}
        </p>
      )}
      {userNameError && (
        <p className='mt-2 text-sm text-red-600'>{userNameError}</p>
      )}
    </form>
  )
}
