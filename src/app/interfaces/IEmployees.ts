import { IRoles } from "./IRoles"

export interface IEmployees {
    name: string
    last_name: string
    day_of_birth: string
    mobile_number: string
    // id_card_number: string
    address: string
    // job_title: string
    priority: number
    employees_pk_id: string,
    roles: IRoles[]
    fingerprint_scanner_user_id: string,
    // can_update: boolean,
    // can_deleted: boolean,
    email: string,
    // create_date: string
    // update_date: string,
    // delete_date: string,
    // deleted: boolean,
    // expire_date: string,
    // visible: boolean,
}
