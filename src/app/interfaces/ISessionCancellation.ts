import { IUsers } from "./IUsers"
import { Course, ISubCourseSingle } from "./ISubCourse"

export interface ISessionCancellation {
    created: IUsers
    description: string
    status: number
    priority: number
    session_cancellation_pk_id: string
    course: Course
    sub_course: ISubCourseSingle
    session: any
    teacher: IUsers
}