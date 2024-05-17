import { IRoles } from "./IRoles"

export interface IuserEditForm{
    name: string
  last_name: string
  day_of_birth: string
  email: string
  mobile_number: string
  id_card_number: string
  address: string
  user_pk_id: string
  roles: IRoles[]
  fingerprint_scanner_user_id: string
}