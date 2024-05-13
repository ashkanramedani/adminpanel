
import { ISubCourse } from "./ISubCourse"
import { IUsers } from "./IUsers"

export interface ICourse{
    delete_date: string,
    course_name: string,
    deleted: boolean,
    expire_date: string,
    course_image: string ,
    visible: boolean,
    description: string,
    starting_date: string,
    priority: number,
    status: number,
    ending_date: string,
    can_update: boolean,
    course_pk_id: string,
    course_capacity: number,
    can_deleted: boolean,
    created_fk_by: string
    course_level: string
    create_date: string
    course_language: string
    course_code: string
    update_date: string
    course_type: string
    package_discount: number
    sub_course: ISubCourse[],
    teachers: IUsers [],
    session_signature: [],
    available_seat: number   
}