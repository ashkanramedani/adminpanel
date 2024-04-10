import { IEmployeesForm } from "./IEmployeesForm"

export interface ICourse {
    created_fk_by: string
    course_pk_id: string
    name: string
    course_time: string
    duration: number,
    teachers: IEmployeesForm[]
    priority: number,
    deleted: boolean,
    can_deleted: boolean,
    update_date: string,
    expire_date: string,
    status: number,
    visible: boolean,
    can_update: boolean,
    create_date: string
    delete_date: string
    description: string,
}