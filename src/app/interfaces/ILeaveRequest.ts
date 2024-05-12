import { IUser } from "./IUser"

export interface ILeaveRequest
{
    leave_request_pk_id: string
    start_date: string
    end_date: string
    description: string
    created: IUser
    employee: IUser
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
}