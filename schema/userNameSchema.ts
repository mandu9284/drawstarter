import z from 'zod'
import { Dictionary } from '@/types/dictionaryType'

export const getUserNameSchema = ({ dict }: { dict: Dictionary }) => {
  const userNameSchema = z
    .string()
    .trim()
    .min(3, { message: dict.settings.username_min_length_error })
    .max(25, { message: dict.settings.username_max_length_error })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message: dict.settings.username_regex_error,
    })
    .refine((val) => !val.includes('admin'), {
      message: dict.settings.username_reserved_error,
    })
    .refine((val) => !val.startsWith('.'), {
      message: dict.settings.username_start_error,
    })
    .refine((val) => !val.endsWith('.'), {
      message: dict.settings.username_end_error,
    })

  return userNameSchema
}
