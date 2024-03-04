import { IUser } from "./IUser"

export interface IMissionForm
{
    business_trip_pk_id: string
    destination: string
    description: string
    created: IUser
    employee: IUser
}