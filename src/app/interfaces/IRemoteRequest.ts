import { IUser } from "./IUser"

export interface IRemoteRequest {
    remote_request_pk_id: string
    start_date: string
    end_date: string
    description: string
    created: IUser
    employee: IUser
    employee_fk_id: string
    working_location: string
    created_fk_by: string
    status: number
    create_date: string
    update_date: string
    delete_date: string
    deleted: boolean,
    expire_date: string
    visible: boolean
    priority: number
    can_update: boolean
    can_deleted: boolean
}