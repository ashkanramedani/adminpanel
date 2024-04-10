import { IEmployeesForm } from "./IEmployeesForm"

export interface ICourseForm {
    created_fk_by: string
    course_pk_id: string
    name: string,
    course_time: string
    duration: number
    teachers: string[]
}