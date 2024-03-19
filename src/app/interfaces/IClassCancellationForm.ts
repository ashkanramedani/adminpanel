export interface IClassCancellationForm
{
    created_fk_by: string
    description: string,
    status: number
    class_fk_id: string
    teacher_fk_id: string
    replacement_date: string
    class_duration: number
    class_location: string
    class_cancellation_pk_id:string
}