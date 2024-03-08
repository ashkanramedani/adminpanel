import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface ISubstituteTeacher
{
    teacher_replacement_pk_id: string
    created:IUser
    main_teacher: IUser
    replacement_teacher: IUser
    classes: IClass
}