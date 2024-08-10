export interface ISubRequestAll {
  created: Created;
  description: string;
  status: string;
  priority: number;
  note: Note;
  sub_request_pk_id: string;
  course: Course;
  sub_course: Subcourse;
  sessions: Sessions;
  main_teacher: Created;
  sub_teacher: Created;
}
interface Sessions {
  session_pk_id: string;
  is_sub: boolean;
  session_date: string;
  session_starting_time: string;
  session_ending_time: string;
  course: Course;
  sub_course: Subcourse;
  teacher: Created;
}
interface Subcourse {
  sub_course_pk_id: string;
  sub_course_name: string;
  number_of_session: number;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  sub_course_capacity: number;
  sub_course_available_seat: number;
  teacher: Created;
}
interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}
interface Note {
}
interface Created {
  user_pk_id: string;
  name: string;
  last_name: string;
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
