import { IClass } from "./IClass"
import { IUsers } from "./IUsers"

export interface ITeacherReplacement {
    replacement_teacher_fk_id: string
    created: IUsers
    main_teacher: IUsers
    replacement_teacher: IUsers
    classes: IClass
    created_fk_by: string
    status: number
    teacher_fk_id: string
    course_fk_id: string
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