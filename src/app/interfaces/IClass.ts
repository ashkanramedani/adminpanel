import { Time } from "@angular/common"

export interface IClassForm
{
    class_pk_id :string
    starting_time : Time
    duration :number
    class_date :Date
}