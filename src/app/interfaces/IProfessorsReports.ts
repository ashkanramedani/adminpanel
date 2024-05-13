export interface IProfessorsReports {
    teachers_report_pk_id: string
    created_by_fk_id: string
    teacher_fk_id: string
    class_fk_id: string
    score: number
    number_of_student: number
    canceled_classes: number
    replaced_classes: number
    starts_at: Date
    ends_at: Date
    teacher_sheet_score: number
}