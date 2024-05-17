import { ISessionSignature } from "./ISessionSignature"

export interface ISubCourseForm{
        created_fk_by: string
        status: number,
        course_fk_id: string
        sub_course_teacher_fk_id: string
        sub_course_name: string,
        number_of_session: number,
        sub_course_pk_id:string
        sub_course_starting_date: string
        sub_course_ending_date: string
        session_signature: ISessionSignature[]
        description:string
    
}