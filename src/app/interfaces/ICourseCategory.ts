import { IUsers } from "./IUsers"

export interface ICourseCategory{
        created_fk_by: string
        description: string,
        status: number,
        visible: boolean,
        priority: number,
        can_update: boolean,
        can_deleted: boolean,
        category_name: string,
        category_pk_id: string,
        created: IUsers
}