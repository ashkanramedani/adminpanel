export interface IBusinessTripForm
{
    created_fk_by: string
    description: string,
    user_fk_id: string
    start_date: string
    end_date: string
    destination:string
    business_trip_pk_id:string
    status:number
}

export interface IBusinessTripEditForm
{
  created_fk_by: string
  description: string,
  destination: string,
  business_trip_pk_id: string
  start: string,
  end: string,
  date: string
  status:string
}
