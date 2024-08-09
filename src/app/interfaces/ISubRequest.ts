export interface ISubRequestAll {
  update_date: string;
  course_fk_id: string;
  delete_date?: any;
  sub_course_fk_id: string;
  visible: boolean;
  expire_date?: any;
  session_fk_id: string;
  priority: number;
  status: string;
  main_teacher_fk_id: string;
  deleted: boolean;
  description: string;
  sub_teacher_fk_id: string;
  can_update: boolean;
  note: Note;
  can_deleted: boolean;
  sub_request_pk_id: string;
  create_date: string;
  created_fk_by: string;
}
interface Note {
}

export interface ISubRequestSingle {
  update_date: string;
  course_fk_id: string;
  delete_date?: any;
  sub_course_fk_id: string;
  visible: boolean;
  expire_date?: any;
  session_fk_id: string;
  priority: number;
  status: string;
  main_teacher_fk_id: string;
  deleted: boolean;
  description: string;
  sub_teacher_fk_id: string;
  can_update: boolean;
  note: Note;
  can_deleted: boolean;
  sub_request_pk_id: string;
  create_date: string;
  created_fk_by: string;
}
export interface ISubRequestInsert {
  created_fk_by: string;
  description: string;
  session_fk_id: string;
  sub_teacher_fk_id: string;
}
export interface ISubRequestUpdate {
  created_fk_by: string;
  description: string;
  session_fk_id: string;
  sub_teacher_fk_id: string;
  sub_request_pk_id: string;
}
