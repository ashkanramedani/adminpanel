export interface ILeaveRequestForm {
    created_fk_by: string
    description: string,
    user_fk_id: string
    start_date: string
    end_date: string
    status:boolean
    leave_request_pk_id:string
}
export interface ILeaveRequestEditForm
{
  created_fk_by: string
  description: string,
  leave_type: string,
  leave_request_pk_id:string
  start: string,
  end: string,
  date: string
}
