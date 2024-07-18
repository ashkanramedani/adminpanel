import { IUsers } from "./IUsers";

export interface ICourseAll{
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  course_pk_id: string;
  course_name: string;
  package_discount: number;
  course_image: string;
  course_capacity: number;
  course_level: string;
  course_code: string;
  starting_date: string;
  ending_date: string;
  teachers: IUsers[];
  course_signature: Coursesignature[];
  available_seat: number;
  tags: any[];
  categories: any[];
  language: Language;
  type: Type;
}
export interface Type {
  course_type_name: string;
}
export interface Language {
  language_name: string;
}
export interface Coursesignature {
  days_of_week: number;
  session_date: string;
}

 export interface ICourseSingle{

  can_deleted: boolean;
  course_pk_id: string;
  course_capacity: number;
  create_date: string;
  created_fk_by: string;
  course_level: string;
  priority: number;
  update_date?: any;
  course_language: string;
  course_code: string;
  delete_date?: any;
  course_type: string;
  package_discount: number;
  expire_date?: any;
  course_name: string;
  Course_price: number;
  visible: boolean;
  status: string;
  course_image: string;
  deleted: boolean;
  description: string;
  starting_date: string;
  can_update: boolean;
  note: Note;
  ending_date: string;
  teachers: Teacher[];
  session_signature: any[];
  available_seat: number;
}
interface Teacher {
  deleted: boolean;
  description: string;
  day_of_birth?: string;
  can_update: boolean;
  note: Note;
  email: string;
  level?: string;
  can_deleted: boolean;
  user_pk_id: string;
  mobile_number: string;
  create_date: string;
  created_fk_by: string;
  emergency_number: string;
  priority: number;
  update_date?: string;
  name: string;
  id_card_number?: string;
  delete_date?: any;
  last_name: string;
  address?: any;
  expire_date?: any;
  nickname: string;
  fingerprint_scanner_user_id: number;
  visible: boolean;
  status: string;
  is_employee: boolean;
}
interface Note {
}



export interface ICourseAdd {
  created_fk_by: string;
  description: string;
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_capacity: number;
  course_language: string;
  course_type: string;
  course_code: string;
  course_image: string;
  tags: any[];
  categories: any[];
  course_level: string;
  package_discount: number;
}
export interface ICourseUpdate {
  created_fk_by: string;
  description: string; 
  course_name: string;
  starting_date: string;
  ending_date: string;
  course_capacity: number;
  course_language: string;
  course_type: string;
  course_code: string;
  course_image: string;
  tags: any[];
  categories: any[];
  course_level: string;
  package_discount: number;
  course_pk_id: string;
}
