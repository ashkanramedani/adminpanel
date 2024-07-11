
export interface IloggedInUser {
  email: string
  fname: string
  lname: string
  mobile_number: string
  image: string
  panel_image: string
  employed: boolean
  facebook_link: any
  linkedin_link: any
  twitter_link: any
  instagram_link: any
  telegram_link: any
  whatsapp_link: any
  self_introduction_video: string
  department: any
  teaching_start_date: any
  teaching_languages: TeachingLanguages
  bio: any
  can_contact_to_me_from_site: boolean
  about_me: AboutMe
  meta_data: MetaData
  nationality: string
  passport_id: any
  national_id: any
  address: any
  phone_number: any
  telegram_number: any
  birth_date: any
  birth_place: any
  gender_fk_id: number
  priority: number
  user_pk_id: number
  branch_fk_id: number
  authentication_fk_id: number
  branch: Branch
  gender: Gender
  products_user: any[]
  posts_user_speaker: any[]
  posts_user_writer: any[]
  posts_user_actor: any[]
}

export interface TeachingLanguages { }

export interface AboutMe { }

export interface MetaData { }

export interface Branch {
  branch_name: string
  branch_province: string
  branch_city: string
  priority: number
  branch_pk_id: number
  visible: boolean
}

export interface Gender {
  gender_name: string
  priority: number
  gender_pk_id: number
  visible: boolean
}
