import { IRoles } from "./IRoles"

export interface IUsersForm{
    name: string,
    last_name: string,
    day_of_birth: string
    email: string,
    mobile_number: string,
    address: string,
    user_pk_id: string
    priority: number,
    fingerprint_scanner_user_id: string,
    roles:IRoles[]
}