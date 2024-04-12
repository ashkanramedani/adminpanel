export interface ITeacherDelayForm
{
    created_fk_by:string
    description: string,
    status: number
    teacher_fk_id:string
    course_fk_id: string
    delay: number
    teacher_tardy_reports_pk_id:string
}