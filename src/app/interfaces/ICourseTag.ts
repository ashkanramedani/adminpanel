import { IUsers } from "./IUsers"


export interface ICourseTagAll{
  created_fk_by: string;
  description: string; 
  tag_name: string;
  tag_pk_id: string;
  created: IUsers;

}
export interface ICourseTagSingle{
  can_update: boolean;
  priority: number;
  create_date: string;
  delete_date?: any;
  status: string;
  note: Note;
  tag_name: string;
  visible: boolean;
  deleted: boolean;
  can_deleted: boolean;
  update_date?: any;
  expire_date?: any;
  description: string;
  tag_pk_id: string;
  created_fk_by: string;
}
interface Note {
}
export interface ICourseTagAdd{
  created_fk_by: string;
  description: string;
  tag_name: string;
}
export interface ICourseTagUpdate{
  created_fk_by: string;
  description: string;
  tag_name: string;
  tag_pk_id: string;
}
