import { SalaryTypeEnum } from "../enum/SalaryTypeEnum"
import { IUsers } from "./IUsers"

export interface ISalaryPolicy{

    visible: boolean,
    description: string,
    Regular_hours_factor: number,
    medical_leave_factor: number,
    vacation_leave_factor: number,
    priority: number,
    status: number,
    Regular_hours_cap: number,
    off_day_permission: boolean,
    medical_leave_cap: number,
    can_update: boolean,
    SalaryPolicy_pk_id: string
    overtime_permission: boolean,
    off_day_factor: number,
    vacation_leave_cap: number,
    can_deleted: boolean,
    created_fk_by: string
    overtime_factor: number,
    off_day_cap: number,
    business_trip_permission: boolean,
    create_date: string
    employee_fk_id: string
    overtime_cap: number,
    remote_permission: boolean,
    business_trip_factor: number,
    update_date: string,
    Salary_Type: SalaryTypeEnum,
    overtime_threshold: number,
    remote_factor: number,
    business_trip_cap: number,
    delete_date: number,
    day_starting_time: string,
    undertime_factor: number,
    remote_cap: number,
    deleted: boolean,
    expire_date: string,
    day_ending_time: string,
    undertime_threshold: number
    user_fk_id:string
    salary_policy_pk_id:string
    employee:IUsers
    created:IUsers
}
