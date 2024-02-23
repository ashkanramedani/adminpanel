import { JobTitleEnum } from "../Enums/JobTitleEnum"

export interface IEmployees
{
    employees_pk_id :string
    name :string
    last_name :string
    job_title :JobTitleEnum
    fingerprint_scanner_user_id :string
}