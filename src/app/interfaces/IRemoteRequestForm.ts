import { IUser } from "./IUser"

export interface IRemoteRequestForm
{
    remote_request_pk_id: string
    start_date: string
    end_date: string
    description: string
    created: IUser
    employee:IUser
}