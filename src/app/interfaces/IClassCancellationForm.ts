export interface IClassCancellationForm
{
    class_cancellation_pk_id :string
    created_date :Date
    created_fk_by :string
    class_fk_id :string
    teacher_fk_id :string
    replacement :Date
    class_duration :number
    class_location :string
    description :string
}