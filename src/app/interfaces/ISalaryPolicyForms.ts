import { SalaryTypeEnum } from "../enum/SalaryTypeEnum"

export interface ISalaryPolicyForms {
    created_fk_by: string
    user_fk_id: string
    day_starting_time: string
    day_ending_time: string
    Regular_hours_factor: number,
    Regular_hours_cap: number,
    overtime_permission: boolean,
    overtime_factor: number,
    Base_salary:number
    overtime_cap: number,
    overtime_threshold: number,
    undertime_factor: number,
    undertime_threshold: number,
    off_day_permission: boolean,
    off_day_factor: number,
    off_day_cap: number,
    remote_permission: boolean,
    remote_factor: number,
    remote_cap: number,
    medical_leave_factor: number,
    medical_leave_cap: number,
    vacation_leave_factor: number,
    vacation_leave_cap: number,
    business_trip_permission: boolean,
    business_trip_factor: number,
    business_trip_cap: number
    salary_policy_pk_id:string
    Salary_Type:SalaryTypeEnum
    Fix_pay:number
}
