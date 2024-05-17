export interface ISessionForm{
    
  course_fk_id: string
  created_fk_by: string
  sub_course_fk_id: string
  session_teacher_fk_id: string
  is_sub: boolean,
  session_date: string
  session_starting_time: string
  session_ending_time: string
  session_duration: number,
  days_of_week: number,
  session_pk_id: string
}