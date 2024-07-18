export interface IRemoteRequestAdd
{
  created_fk_by: string;
  description: string;
  working_location: string;
  user_fk_id: string;
  start_date: string;
  end_date: string;
}
export interface IRemoteRequestUpdate
{
  created_fk_by: string;
  description: string;
  working_location: string;
  remote_request_pk_id: string;
  start: string;
  end: string;
  date: string;
}
