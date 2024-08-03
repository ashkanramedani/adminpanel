import { IUsers } from "./IUsers"

export interface ISessionCancellationAll {
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  session_cancellation_pk_id: string;
  course: Course;
  sub_course: Subcourse;
  session: Session;
}

export interface ISessionCancellationSingle {
  can_deleted: boolean;
  session_cancellation_pk_id: string;
  create_date: string;
  created_fk_by: string;
  update_date?: any;
  course_fk_id: string;
  visible: boolean;
  delete_date?: any;
  sub_course_fk_id: string;
  priority: number;
  expire_date?: any;
  session_fk_id: string;
  deleted: boolean;
  status: string;
  can_update: boolean;
  description: string;
  note: Note;

}
export interface Note {
}
export interface ISessionCancellationAdd {
  created_fk_by: string;
  description: string;
  session_fk_id: string;
}
export interface ISessionCancellationUpdate {

}


export interface Session {
  session_pk_id: string;
  is_sub: boolean;
  session_date: string;
  session_starting_time: string;
  session_ending_time: string;
  course: Course;
  sub_course: Subcourse;
  teacher: IUsers;
}
export interface Subcourse {
  sub_course_pk_id: string;
  sub_course_name: string;
  number_of_session: number;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  sub_course_capacity: number;
  sub_course_available_seat: number;
  teacher: IUsers;
}
export interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}
