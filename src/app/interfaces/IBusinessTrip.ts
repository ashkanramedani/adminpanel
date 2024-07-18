import { IUsers } from "./IUsers"

export interface IBusinessTripAll {
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  business_trip_pk_id: string;
  start: string;
  end: string;
  date: string;
  destination: string;
  employee: IUsers;
}
export interface IBusinessTripSingle {
  delete_date?: any;
  start: string;
  visible: boolean;
  expire_date?: any;
  end: string;
  priority: number;
  status: string;
  date: string;
  deleted: boolean;
  description: string;
  duration: number;
  can_update: boolean;
  note: Note;
  destination: string;
  can_deleted: boolean;
  business_trip_pk_id: string;
  create_date: string;
  user_fk_id: string;
  update_date?: any;
  created_fk_by: string;
}
interface Note {
}

export interface IBusinessTripReport {
  delete_date?: any;
  start: string;
  visible: boolean;
  expire_date?: any;
  end: string;
  priority: number;
  status: string;
  date: string;
  deleted: boolean;
  description: string;
  duration: number;
  can_update: boolean;
  note: Note;
  destination: string;
  can_deleted: boolean;
  business_trip_pk_id: string;
  create_date: string;
  user_fk_id: string;
  update_date?: any;
  created_fk_by: string;
}

