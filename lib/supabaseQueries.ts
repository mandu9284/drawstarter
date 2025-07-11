import { supabase } from './supabaseClient'

interface GetUserProfileResponse {
  user_name: string
  profile_picture_url: string
}

export const getUserProfile = async (
  userId: string,
): Promise<GetUserProfileResponse | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('user_name, profile_picture_url')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user :', error)
    return null
  }

  return data
}

export const upsertProfilePicture = async (
  filePath: string,
  profileImage: File,
): Promise<void> => {
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, profileImage, {
      upsert: true,
    })

  if (uploadError) {
    throw new Error('Error uploading profile picture', uploadError)
  }
}

export const updateProfile = async (
  userId: string,
  userName: string,
): Promise<void> => {
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ user_name: userName })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Supabase user_profiles update error', updateError)
  }
}
export const updateProfilePicture = async (
  userId: string,
  profilePictureUrl: string | null,
): Promise<void> => {
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ profile_picture_url: profilePictureUrl })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Supabase user_profiles update error', updateError)
  }
}

export const deleteProfilePicture = async (filePath: string): Promise<void> => {
  const { error: deleteError } = await supabase.storage
    .from('avatars')
    .remove([filePath])

  if (deleteError) {
    throw new Error('Error deleting profile picture', deleteError)
  }
}
