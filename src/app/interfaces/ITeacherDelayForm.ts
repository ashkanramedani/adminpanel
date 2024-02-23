export interface ITeacherDelayForm
{
    teacher_tardy_reports_pk_id :string
    created_fk_by :string
    teacher_fk_id :string
    class_fk_id :string
    delay :number
}