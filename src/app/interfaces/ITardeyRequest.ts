import { IClass } from "./IClass"
import { IUsers } from "./IUsers"

export interface ITardeyRequest
{
    teacher_tardy_reports_pk_id :string
    created :IUsers
    teacher :IUsers
    classes :IClass
    delay :number
}