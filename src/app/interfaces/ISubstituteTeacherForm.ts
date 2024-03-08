export interface ISubstituteTeacherForm
{
    created_fk_by: string
    description: string,
    status: boolean
    teacher_fk_id: string
    replacement_teacher_fk_id: string
    class_fk_id: string
}