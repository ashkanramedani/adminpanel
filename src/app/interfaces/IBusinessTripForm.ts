export interface IBusinessTripAdd
{
    created_fk_by: string
    description: string,
    user_fk_id: string
    start_date: string
    end_date: string
    destination:string
    business_trip_pk_id:string 
}

export interface IBusinessTripUpdate
{
  created_fk_by: string
  description: string,
  destination: string,
  business_trip_pk_id: string
  start: string,
  end: string,
  date: string
}
