import { IRolesForm } from "./IRolesForm"

export interface IUserSigleForm{
    name: string,
    last_name: string,
    day_of_birth: string
    email: string,
    mobile_number: string,
    address: string,
    user_pk_id: string
    fingerprint_scanner_user_id: string,
    roles:IRolesForm[]
}