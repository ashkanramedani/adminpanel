export interface IRemoteRequestForm
{
  created_fk_by:string
  description: string,
  user_fk_id: string
  start_date: string
  end_date:string
  working_location: string
  status:boolean
  remote_request_pk_id:string
}
export interface IRemoteRequestEditForm
{
  description:string ,
  date: string
  note: {},
  duration: number,
  remote_request_pk_id: string
  user_fk_id: string
  created_fk_by: string
  working_location: string,
  start:string
  status: string
  end: string
}
