export interface Dictionary {
  auth: {
    agree_terms_signup_required: string
    signup_complete_check_email: string
    signup: string
    login: string
    email: string
    password: string
    terms_and_conditions: string
    i_agree: string
    already_have_account: string
    dont_have_account: string
    logout: string
    forgot_password: string
    send_reset_email: string
    reset_password_success: string
    reset_password_error: string
    email_required_for_reset: string
    back_to_login: string
    set_new_password_title: string
    set_new_password_button: string
    not_logged_in_error: string
    password_reset_success: string
  }
  home: {
    total_accumulated_time: string
    today_work_time: string
    view_other_topics: string
    start_drawing: string
    minutes: string
    today_subject: string
  }
  draw: {
    start: string
    reset: string
    pause: string
    complete: string
    timer: string
    minutes: string
    setTime: string
  }
  done: {
    title: string
    description: string
    thanks: string
  }
  metadata: {
    description: string
    keywords: string[]
    terms_of_service: string
    privacy_policy: string
  }
  landing: {
    title: string
    subtitle: string
    feature_1_title: string
    feature_1_description: string
    feature_2_title: string
    feature_2_description: string
    feature_3_title: string
    feature_3_description: string
  }
  header: {
    languages: string
    language_label: string
    settings: string
    home: string
    terms: string
  }
  settings: {
    change_password_title: string
    new_password_label: string
    confirm_password_label: string
    password_min_length_error: string
    password_match_error: string
    password_update_error: string
    password_update_success: string
    saving: string
    change_password_button: string
    theme_label: string
    light_mode: string
    dark_mode: string
    profile_title: string
    profile_button: string
    profile_image_label: string
    username_label: string
    save_profile: string
    error_message_not_logged_in: string
    error_message: string
    loading_user_data: string
    error_loading_user_data: string
    profile_updated_successfully: string
    username_min_length_error: string
    username_max_length_error: string
    username_regex_error: string
    username_reserved_error: string
    username_start_error: string
    username_end_error: string
    delete_profile_picture_confirmation: string
  }
}

export interface Language {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
]

export type SupportedLanguage = 'en' | 'ja' | 'ko'
