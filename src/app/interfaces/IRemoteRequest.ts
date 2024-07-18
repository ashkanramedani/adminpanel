import { IUsers } from "./IUsers"

export interface IRemoteRequestAll {
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  remote_request_pk_id: string;
  start: string;
  end: string;
  date: string;
  working_location: string;
  employee: IUsers;
}

export interface IRemoteRequestSingle {
  deleted: boolean;
  description: string;
  date: string;
  can_update: boolean;
  note: Note;
  duration: number;
  can_deleted: boolean;
  remote_request_pk_id: string;
  create_date: string;
  user_fk_id: string;
  update_date?: any;
  created_fk_by: string;
  visible: boolean;
  delete_date?: any;
  working_location: string;
  priority: number;
  expire_date?: any;
  start: string;
  status: string;
  end: string;
}
interface Note {
}

export interface IRemoteRequestReport {
  deleted: boolean;
  description: string;
  date: string;
  can_update: boolean;
  note: Note;
  duration: number;
  can_deleted: boolean;
  remote_request_pk_id: string;
  create_date: string;
  user_fk_id: string;
  update_date?: any;
  created_fk_by: string;
  visible: boolean;
  delete_date?: any;
  working_location: string;
  priority: number;
  expire_date?: any;
  start: string;
  status: string;
  end: string;
}
interface Note {
}
