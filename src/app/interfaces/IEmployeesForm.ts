import { IRoles } from "./IRoles"

export interface IEmployeesForm{
    name: string,
    last_name: string,
    day_of_birth: string
    email: string,
    mobile_number: string,
    id_card_number: string,
    address: string,
    employees_pk_id: string
    priority: number,
    fingerprint_scanner_user_id: string,
    roles:IRoles[]
}