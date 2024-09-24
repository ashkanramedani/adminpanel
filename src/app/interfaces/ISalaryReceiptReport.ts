

export interface ISalaryReceiptReport {
  created: Created;
  description: string;
  status: string;
  priority: number;
  employee_salary_pk_id: string;
  employee?: Employee;
  fingerprint_scanner_user_id: number;
  present_time: number;
  Regular_hours: number;
  Overtime: number;
  Undertime: number;
  delay: number;
  haste: number;
  attendance_points: number;
  Regular_earning: number;
  Overtime_earning: number;
  Off_Day_earning: number;
  Undertime_deductions: number;
  insurance_deductions: number;
  tax_deductions: number;
  remote: number;
  vacation_leave: number;
  medical_leave: number;
  business_trip: number;
  remote_earning: number;
  vacation_leave_earning: number;
  medical_leave_earning: number;
  business_trip_earning: number;
  total_earning: number;
  total_deduction: number;
  total_income: number;
  Off_Day: number;
  Fix_pay: number;
}
interface Employee {
  name?: string;
  last_name?: string;
  email: string;
  level: string;
  address?: any;
  id_card_number?: string;
  mobile_number: string;
  day_of_birth: string;
  user_pk_id: string;
}
interface Created {

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
  Off_Day: number,
  IsValid: boolean,
  EnterExit: string
  msg: string
}
export interface ISalaryEmployeeUpdate{
  rewards_earning:number
  punishment_deductions: number
  loan_installment : number
  payment?:string,
  payment_date?:string
}
