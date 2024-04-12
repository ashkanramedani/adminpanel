import { IEmployeesForm } from "./IEmployeesForm"

export interface Ipayment_method{
 
    created_fk_by: string
    description: string
    status: number,
    employee_fk_id:string
    shaba:string
    card_number:string
    payment_method_pk_id: string
    created: IEmployeesForm
    employee: IEmployeesForm,
    create_date:string
}