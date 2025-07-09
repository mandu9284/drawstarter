import { supabase } from "./supabaseClient"

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from('user_profiles').select('user_name, profile_picture_url').eq('id', userId).single()

  if (error) {
    console.error('Error fetching user :', error)
    return null
  }

  return data
}

export const getUserProfileUrl = async (filePath: string) => {

  const { data: profileUrl } = await supabase.storage.from('avatars').getPublicUrl(filePath,{
    transform: {
      width: 32,
      height: 32,
    },
  })
  return profileUrl
}
