export interface IBusinessTripReport {
  business_trip_pk_id: string
  can_deleted: boolean
  can_update: boolean
  create_date: string
  created_fk_by: string
  delete_date: string
  deleted: boolean
  description: string
  destination: string
  duration: number
  end_date: string
  expire_date: string
  priority: number
  start_date: string
  status: number
  update_date: string
  user_fk_id: string
  visible: boolean
}
