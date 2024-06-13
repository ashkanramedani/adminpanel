

export interface ISalaryReceiptReport {
  update_date: string,
  month: number,
  Overtime_earning: number,
  medical_leave: number,
  delete_date: string,
  fingerprint_scanner_user_id: string,
  Undertime_earning: number,
  medical_leave_earning: number,
  visible: boolean,
  expire_date: string,
  present_time: number,
  Off_Day_earning: number,
  business_trip: number,
  priority: number,
  description: string,
  regular_work_time: number,
  business_trip_earning: number,
  total_earning: number
  deleted: boolean,
  status: number,
  overtime: number,
  remote: number,
  Salary_Policy: ISalaryPolicyReceip
  can_update: boolean,
  employee_salary_pk_id: string
  undertime: number,
  remote_earning: number,
  Days: ISalaryDays[]
  can_deleted: true,
  user_fk_id: string
  off_Day_work_time: number,
  vacation_leave: number,
  create_date: string
  year: number,
  Regular_earning: number
  vacation_leave_earning: number
}

export interface ISalaryPolicyReceip {
  update_date: string,
  Base_salary: number,
  overtime_cap: number,
  off_day_cap: number,
  business_trip_factor: number,
  delete_date: string,
  Salary_Type: string,
  overtime_threshold: number,
  remote_permission: boolean,
  business_trip_cap: number,
  visible: boolean,
  expire_date: string,
  day_starting_time: string,
  undertime_factor: number,
  remote_factor: number,
  priority: number,
  description: string,
  day_ending_time: string,
  remote_cap: number,
  medical_leave_cap: number,
  deleted: boolean,
  status: number,
  Regular_hours_factor: number,
  undertime_threshold: number,
  medical_leave_factor: number,
  can_update: boolean,
  Regular_hours_cap: number,
  off_day_permission: boolean,
  vacation_leave_factor: number,
  can_deleted: boolean,
  overtime_permission: boolean,
  off_day_factor: number,
  vacation_leave_cap: number,
  create_date: string
  overtime_factor: number,
  business_trip_permission: string
}

export interface ISalaryDays {
  Date: string
  Holiday: boolean
  Accrued_Holiday: boolean
  present_time: number,
  Regular_hours: number,
  Overtime: number,
  Undertime: number,
  off_Day_Overtime: number,
  IsValid: boolean,
  EnterExit: string
  msg: string
}
