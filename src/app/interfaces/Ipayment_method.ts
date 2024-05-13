import { IUsersForm } from "./IUsersForm"

export interface Ipayment_method{
 
    created_fk_by: string
    description: string
    status: number,
    user_fk_id:string
    shaba:string
    card_number:string
    payment_method_pk_id: string
    created: IUsersForm
    employee: IUsersForm,
    create_date:string
}