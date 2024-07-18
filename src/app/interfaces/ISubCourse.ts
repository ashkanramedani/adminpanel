import { IUsers } from "./IUsers"

export interface ISubCourseAll {
  created_fk_by: string;
  description: string;
  sub_course_pk_id: string;
  sub_course_name: string;
  sub_course_capacity: number;
  sub_course_available_seat: number;
  created: IUsers;
  teacher: IUsers;
  course: Course;
}
export interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}
export interface ISubCourseSingle {
  deleted: boolean;
  description: string;
  sub_course_starting_date: string;
  can_update: boolean;
  note: Note;
  sub_course_ending_date: string;
  can_deleted: boolean;
  sub_course_pk_id: string;
  sub_request_threshold: number;
  create_date: string;
  course_fk_id: string;
  sub_course_capacity: number;
  update_date?: any;
  created_fk_by: string;
  sub_course_available_seat: number;
  delete_date?: any;
  sub_course_teacher_fk_id: string;
  visible: boolean;
  expire_date?: any;
  sub_course_name: string;
  priority: number;
  status: string;
  number_of_session: number;
}
export interface Note {
}

export interface ISubCourseAdd {
  created_fk_by: string;
  description: string;
  sub_course_teacher_fk_id: string;
  sub_course_name: string;
  course_fk_id: string;
  number_of_session: number;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  sub_request_threshold: number;
  session_signature: Sessionsignature[];
}
export interface Sessionsignature {
  days_of_week: number;
  starting_time: string;
  duration: number;
}

export interface ISubCourseUpdate {
  created_fk_by: string;
  description: string; 
  sub_course_teacher_fk_id: string;
  sub_course_name: string;
  sub_course_pk_id: string;
}
