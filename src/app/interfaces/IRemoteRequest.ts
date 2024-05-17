import { IUsers } from "./IUsers"

export interface IRemoteRequest {
    created_fk_by:string
    description: string,
    user_fk_id: string
    start_date: string
    end_date:string
    working_location: string
    status:number
    remote_request_pk_id:string
    created:IUsers
    employee:IUsers
}