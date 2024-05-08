import { IRoles } from "./IRoles"

export interface IUser
{
    name: string,
    last_name: string
    user_pk_id:string,
    roles:IRoles[]
}