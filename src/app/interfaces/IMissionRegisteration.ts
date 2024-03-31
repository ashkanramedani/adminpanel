import { IUser } from "./IUser"

export interface IMissionRegisteration {
    business_trip_pk_id: string
    destination: string
    description: string
    created: IUser
    employee: IUser
    delete_date: string,
    end_date: string
    deleted: boolean
    expire_date: string
    visible: boolean
    status: number
    priority: number
    can_update: boolean
    employee_fk_id: string
    can_deleted: boolean
    created_fk_by: string
    create_date: string
    start_date: string
    update_date: string
}