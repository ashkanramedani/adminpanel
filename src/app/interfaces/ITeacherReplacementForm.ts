export interface ITeacherReplacementForm
{
    created_fk_by: string
    description: string,
    status: boolean
    teacher_fk_id: string
    replacement_teacher_fk_id: string
    course_fk_id: string
    teacher_replacement_pk_id:string
}