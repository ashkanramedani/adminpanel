import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface ITeacherDelay
{
    teacher_tardy_reports_pk_id :string
    created :IUser
    teacher :IUser
    classes :IClass
    delay :number
}