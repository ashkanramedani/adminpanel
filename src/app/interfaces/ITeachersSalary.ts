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
