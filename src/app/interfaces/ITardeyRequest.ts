export interface ITardeyRequestAll
{
  created: Created;
  description: string;
  status: string;
  priority: number;
  note: Note;
  teacher_tardy_report_pk_id: string;
  delay: number;
  teacher: Created;
  course: Course;
  sub_course: Subcourse;
  session: Session;
}
export interface Session {
  session_pk_id: string;
  is_sub: boolean;
  session_date: string;
  session_starting_time: string;
  session_ending_time: string;
  course: Course;
  sub_course: Subcourse;
  teacher: Created;
}
export interface Subcourse {
  sub_course_pk_id: string;
  sub_course_name: string;
  number_of_session: number;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  sub_course_capacity: number;
  sub_course_available_seat: number;
  teacher: Created;
}
export  interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}
export interface Note {
}
interface Created {
  user_pk_id: string;
  name: string;
  last_name: string;

}
export interface ITardeyRequestSingle
{
  can_update: boolean;
  note: Note;
  can_deleted: boolean;
  teacher_tardy_report_pk_id: string;
  create_date: string;
  created_fk_by: string;
  priority: number;
  update_date?: any;
  teacher_fk_id: string;
  delete_date?: any;
  course_fk_id: string;
  expire_date?: any;
  sub_course_fk_id: string;
  visible: boolean;
  status: string;
  session_fk_id: string;
  deleted: boolean;
  description: string;
  delay: number;
}

export interface ITardeyRequestAdd
{
  created_fk_by: string;
  description: string;
  delay: number;
  session_fk_id: string;
}

export interface ITardeyRequestUpdate
{
  created_fk_by: string;
  description: string;
  delay: number;
  teacher_tardy_report_pk_id: string;
}

