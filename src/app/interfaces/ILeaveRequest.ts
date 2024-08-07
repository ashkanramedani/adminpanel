import { IUsers } from "./IUsers"

export interface ILeaveRequestAll
{
    leave_request_pk_id: string
    start_date: string
    end_date: string
    date:string
    description: string
    created: IUsers
    employee: IUsers
    status:number
    visible: true,
  can_update: true,
  create_date: string
  delete_date: null,
  created_fk_by: string
  deleted: boolean
  priority: number
  can_deleted: boolean
  update_date: boolean
  expire_date: string
  employee_fk_id: string
  user_fk_id:string
}
export interface ILeaveRequestSingle
{
  can_update: boolean,
  note: {},
  leave_type: string,
  can_deleted: boolean,
  leave_request_pk_id: string
  create_date: string
  created_fk_by: string
  update_date: boolean,
  user_fk_id: string
  delete_date: string,
  start: string,
  visible: boolean,
  expire_date: string,
  end: string,
  priority: number,
  status: boolean,
  date: string
  deleted: boolean,
  description: string
  duration: number
}
