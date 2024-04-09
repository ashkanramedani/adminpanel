import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface IClassCancellation {
    course_cancellation_pk_id: string
    replacement_date: string
    course_duration: number
    course_location: string
    created: IUser
    teacher: IUser
    classes: IClass
    status: number
    created_fk_by: string
    teacher_fk_id: String
    course_fk_id: string
    description: string
    priority: number,
    can_update: boolean,
    can_deleted: boolean,
    create_date: string
    update_date: string
    delete_date: string
    deleted: boolean,
    expire_date: string
    visible: boolean
}