import { IUsers } from "./IUsers"

export interface IRoles {
    role_pk_id: string
    name: string
    cluster: string
    created_fk_by: string
    description:string
    status: number,
    created: IUsers[]
}

