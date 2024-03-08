import { IClass } from "./IClass"
import { IUser } from "./IUser"

export interface IClassCancellation
{
    class_cancellation_pk_id: string
    replacement_date: string
    class_duration: number
    class_location: string
    created: IUser
    teacher:IUser
    classes: IClass
}