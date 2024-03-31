import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface ISubstituteTeacher {
    replacement_teacher_fk_id: string
    created: IUser
    main_teacher: IUser
    replacement_teacher: IUser
    classes: IClass
    created_fk_by: string
    status: number
    teacher_fk_id: string
    class_fk_id: string
    description: string
    deleted: boolean,
    expire_date: string,
    visible: boolean,
    priority: number,
    can_update: boolean,
    teacher_replacement_pk_id: string
    can_deleted: boolean,
    create_date: string
    update_date: string,
    delete_date: null
}