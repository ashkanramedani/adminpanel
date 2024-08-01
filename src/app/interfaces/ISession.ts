
import { IUsers } from "./IUsers"

export interface ISessionAll{
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  session_pk_id: string;
  course_fk_id: string;
  is_sub: boolean;
  session_date: string;
  session_starting_time: string;
  session_ending_time: string;
  session_duration: number;
  days_of_week: number;
  course: Course;
  sub_course: Subcourse;
  teacher: IUsers;
}
interface Subcourse {
  sub_course_pk_id: string;
  sub_course_name: string;
  number_of_session: number;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  sub_course_capacity: number;
  sub_course_available_seat: number;
  teacher: IUsers;
}
interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}

export interface ISessionSingle{
  priority: number;
  expire_date?: any;
  session_teacher_fk_id: string;
  days_of_week: number;
  visible: boolean;
  status: string;
  sub_Request?: any;
  deleted: boolean;
  description: string;
  is_sub: boolean;
  can_accept_sub: string;
  can_update: boolean;
  note: Note;
  canceled: boolean;
  can_deleted: boolean;
  session_pk_id: string;
  session_date: string;
  create_date: string;
  created_fk_by: string;
  session_starting_time: string;
  update_date?: any;
  course_fk_id: string;
  session_ending_time: string;
  delete_date?: any;
  sub_course_fk_id: string;
  session_duration: number;
}
interface Note {
}
export interface ISessionAdd{
  created_fk_by: string;
  description: string; 
  session_teacher_fk_id: string;
  session_date: string;
  session_starting_time: string;
  session_duration: number;
  sub_request_threshold: number;
  course_fk_id: string;
  sub_course_fk_id: string;
}


export interface ISessionUpdate{
  created_fk_by: string;
  description: string;
  session_teacher_fk_id: string;
  session_date: string;
  session_starting_time: string;
  session_duration: number;
  sub_request_threshold: number;
  session_pk_id: string;
}

export interface ISession{
  days_of_week: number;
  session_pk_id: string;
  session_date: string;
}