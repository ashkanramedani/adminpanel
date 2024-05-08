export interface ILeaveRequestForm {
    created_fk_by: string
    description: string,
    user_fk_id: string
    start_date: string
    end_date: string
    status:boolean
    leave_request_pk_id:string
}