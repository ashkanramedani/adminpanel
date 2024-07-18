import { IUsers } from "./IUsers"

export interface ICourseTypeAll {
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  course_type_name: string;
  course_type_pk_id: string;
}
export interface ICourseTypeSingle {
  visible: boolean;
  deleted: boolean;
  can_update: boolean;
  create_date: string;
  delete_date?: any;
  status: string;
  note: Note;
  course_type_name: string;
  priority: number;
  can_deleted: boolean;
  update_date?: any;
  expire_date?: any;
  description: string;
  course_type_pk_id: string;
  created_fk_by: string;
}
interface Note {
}


export interface ICourseTypeAdd {
  created_fk_by: string;
  description: string;
  course_type_name: string;
}

export interface ICourseTypeUpdate {
  created_fk_by: string;
  description: string; 
  course_type_name: string;
  course_type_pk_id: string;
}
