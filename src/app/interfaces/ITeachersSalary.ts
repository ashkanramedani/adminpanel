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
  number_of_sub_courses:number
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
  Does_Have_Salary_Record:boolean
}
export interface Course {
  course_pk_id: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_level: string;
}
export interface Note {
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

  deleted: boolean;
  description: string;
  punishment_deductions: number;
  event_participate: number;
  tardy: number;
  earning: number;
  can_update: boolean;
  note: Note;
  loan_installment: number;
  CPD: number;
  sub_point: number;
  BaseSalary: number;
  can_deleted: boolean;
  teacher_salary_pk_id: string;
  roles_score: number;
  Odd_hours: number;
  ID_Experience: number;
  cancellation_factor: number;
  create_date: string;
  user_fk_id: string;
  survey_score: number;
  report_to_student: number;
  experience_gain: number;
  update_date?: any;
  subcourse_fk_id: string;
  course_level_score: number;
  LP_submission: number;
  attended_session: number;
  visible: boolean;
  delete_date?: any;
  payment?: any;
  tardy_score: number;
  student_assign_feedback: number;
  cancelled_session: number;
  priority: number;
  expire_date?: any;
  payment_date?: any;
  content_creation: number;
  result_submission_to_FD: number;
  roles: Roles;
  status: string;
  rewards_earning: number;
  name: string;
  SUB: boolean;
  score: number;
}


export interface Score {
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
export interface Teacher {
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
export interface Roles {
  Teachers_Teacher: number;
}
export interface ISalaryTeacherUpdate{
  rewards_earning: number;
  punishment_deductions: number;
  loan_installment: number;
  payment: string;
  payment_date: string;
}
