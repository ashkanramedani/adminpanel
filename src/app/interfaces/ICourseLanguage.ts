import { IUsers } from "./IUsers"

export interface ICourseLanguage {
    created_fk_by: string
    description: string,
    status: number,
    visible: boolean,
    priority: number,
    can_update: boolean,
    can_deleted: boolean,
    language_name: string,
    language_pk_id: string,
    created: IUsers
}