import { IEmployeesForm } from "./IEmployeesForm"

export interface ISalaryPolicy{
        created_fk_by: string
        employee_fk_id: string
        day_starting_time: string
        day_ending_time: string
        Regular_hours_factor: number,
        Regular_hours_cap: number,
        overtime_permission: boolean,
        overtime_factor: number,
        overtime_cap: number,
        overtime_threshold: number,
        undertime_factor: number,
        undertime_threshold: number,
        off_day_permission: true,
        off_day_factor: number,
        off_day_cap: number,
        remote_permission: true,
        remote_factor: number,
        remote_cap: number,
        medical_leave_factor: number,
        medical_leave_cap: number,
        vacation_leave_factor: number,
        vacation_leave_cap: number,
        business_trip_permission: true,
        business_trip_factor: number,
        business_trip_cap: number,
        SalaryPolicy_pk_id: string
        created: IEmployeesForm
        description: string,
        status: number,
        employee:IEmployeesForm
}