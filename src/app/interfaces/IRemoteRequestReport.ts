export interface IRemoteRequestReport {
  visible: boolean,
  expire_date: string,
  start_date: string
  priority: number,
  description: string,
  end_date: string
  deleted: boolean
  status: number,
  duration: number,
  can_update: boolean,
  remote_request_pk_id: string
  can_deleted: boolean,
  user_fk_id: string
  create_date: string
  created_fk_by: string
  update_date: boolean,
  working_location: string,
  delete_date: string
}
