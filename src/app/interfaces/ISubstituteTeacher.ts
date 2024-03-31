import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface ISubstituteTeacher
{
    replacement_teacher_fk_id: string
    created:IUser
    main_teacher: IUser
    replacement_teacher: IUser
    classes: IClass
    created_fk_by:string
    status:number
    teacher_fk_id:string
    class_fk_id:string
    description:string
}