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
export interface IPaymentMethodSingle{
    create_date: string;
    user_fk_id: string;
    update_date?: any;
    created_fk_by: string;
    visible: boolean;
    delete_date?: any;
    shaba: string;
    priority: number;
    expire_date?: any;
    card_number: string;
    deleted: boolean;
    status: string;
    active: boolean;
    can_update: boolean;
    description: string;
    can_deleted: boolean;
    note: Note;
    payment_method_pk_id: string;
  }
  interface Note {
  }
