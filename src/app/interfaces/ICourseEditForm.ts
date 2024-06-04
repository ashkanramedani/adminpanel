import { ICourseFormTag } from "./ICourseFormTag"

export interface ICourseEditForm
{
  created_fk_by: string
  description: string,
  status: number,
  // visible: boolean,
  // priority: number,
  // can_update: boolean,
  // can_deleted: boolean,
  course_name: string,
  starting_date: string
  ending_date: string
  course_capacity: number,
  course_language: string
  course_type: string
  tags: ICourseFormTag[]
  // categories: [],
  course_code: string,
  course_image: string,
  course_level: string,
  package_discount: number
  course_pk_id: string
}
