import { ICourse } from "./ICourse"
import { ISubCourse } from "./ISubCourse"
import { IUsers } from "./IUsers"

export interface ISession{
    created: IUsers
    description: string,
    status: number,
    priority: number,
    session_pk_id: string
    course_fk_id: string
    is_sub: true,
    session_date: string
    session_starting_time: string
    session_ending_time: string
    session_duration: number,
    days_of_week: number,
    course: ICourse
    sub_course: ISubCourse
    teacher:IUsers
}
