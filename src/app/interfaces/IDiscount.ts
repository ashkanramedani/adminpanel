import { IUsers } from "./IUsers";

export interface IDiscountAll
{
  created: IUsers;
  description: string;
  status: string;
  priority: number;
  note: Note;
  discount_code_pk_id: string;
  discount_code: string;
  target_user?: any;
  target_product?: any;
}
export interface Note {
}
export interface IDiscountSingle
{
  priority: number;
  expire_date?: any;
  target_product_fk_id?: any;
  deleted: boolean;
  description: string;
  discount_code: string;
  can_update: boolean;
  note: Note;
  discount_type: string;
  can_deleted: boolean;
  status: string;
  discount_amount: number;
  create_date: string;
  discount_code_pk_id: string;
  start_date: string;
  update_date?: any;
  created_fk_by: string;
  end_date: string;
  delete_date?: any;
  visible: boolean;
  target_user_fk_id?: any;
}

export interface IDiscountInsert
{
  created_fk_by: string;
  description: string;
  discount_type: string;
  discount_amount: number;
  target_user_fk_id: string;
  //target_product_fk_id: string;
  start_date: string;
  end_date: string;
}

export interface IDiscountUpdate
{
  created_fk_by: string;
  description: string;
  discount_code_pk_id: string;
}
