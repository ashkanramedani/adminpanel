export interface ITeachersCourse{
  created: Created;
  description: string;
  status: string;
  priority: number;
  course_pk_id: string;
  course_name: string;
  course_image: string;
  starting_date: string;
  ending_date: string;
  course_capacity: number;
  course_level: string;
  course_code: string;
  language: Language;
  type: Type;
}
export interface Type {
  course_type_name: string;
}
export interface Language {
  language_name: string;
}
export interface Created {
  user_pk_id: string;
  name: string;
  last_name: string;
}


export interface ITeachersSubCourse{
  created: Created;
  description: string;
  status: string;
  priority: number;
  sub_course_pk_id: string;
  sub_course_name: string;
  create_date: string;
  sub_course_starting_date: string;
  sub_course_ending_date: string;
  note: Note;
  sub_teachers: Created[];
  teacher: Created;
  course: Course;
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

 export interface ITeacherCancellationReport
{
  created: Created;
  description: string;
  status: string;
  priority: number;
  note: Note;
  session_cancellation_pk_id: string;
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

export interface ITeacherSubRequestReport{
  created: Created;
  description: string;
  status: string;
  priority: number;
  note: Note;
  sub_request_pk_id: string;
  course: Course;
  sub_course: Subcourse;
  sessions: Session;
  main_teacher: Created;
  sub_teacher: Created;
}
export interface ITeacherTardyReport{
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


export interface ITeacherSummeryBody{
  reward: number;
  punishment: number;
  loan: number;
  cancellation_factor: number;
  content_creation: number;
  event_participate: number;
  CPD: number;
  Odd_hours: number;
  report_to_student: string;
  LP_submission: string;
  student_assign_feedback: string;
  survey_score: string;
  result_submission_to_FD: string;
}

export interface ITeacherSummery{

  teachers: Teacher[];
  score: Score;
}
interface Score {
  reward: number;
  punishment: number;
  loan: number;
  cancellation_factor: number;
  content_creation: number;
  event_participate: number;
  CPD: number;
  Odd_hours: number;
  report_to_student: number;
  LP_submission: number;
  student_assign_feedback: number;
  survey_score: number;
  result_submission_to_FD: number;
  roles_score: number;
  tardy_score: number;
  course_level_score: number;
  effect_on_total: number;
}
interface Teacher {
  course_name?: string;
  course_level?: string;
  course_capacity?: number;
  course_type?: string;
  course_language?: string;
  BaseSalary?: number;
  SUB: boolean;
  tardy?: number;
  sub_point: number;
  experience_gain?: number;
  attended_session?: number;
  cancelled_session?: number;
  name: string;
  roles_score?: number;
  roles?: Roles;
  teacher_id: string;
}
interface Roles {
  Teachers_Teacher: number;
}
