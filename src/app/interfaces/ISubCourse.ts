import { IUsersForm } from "./IUsersForm"

export interface ISubCourse{
    sub_course_pk_id: string
    course_fk_id:string
    sub_course_teacher_fk_id: string
    sub_course_name: string,
    number_of_session: 5,
    sub_course_starting_date: string
    sub_course_ending_date: string
    created: IUsersForm
}