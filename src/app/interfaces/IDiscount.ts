import { IUsers } from "./IUsers";

export interface IDiscountAll
{
  created_fk_by: string;
  description: string;
  visible: boolean;
  priority: number;
  can_update: boolean;
  can_deleted: boolean;
  discount_code_pk_id: string;
  created: IUsers;
  status: string;
  note: Note;
  discount_code: string;
}
export interface Note {
}
export interface IDiscountSingle
{
  deleted: boolean;
  visible: boolean;
  can_deleted: boolean;
  update_date?: any;
  expire_date?: any;
  note: Note;
  discount_code_pk_id: string;
  discount_code: string;
  discount_amount: number;
  can_update: boolean;
  priority: number;
  create_date: string;
  delete_date?: any;
  description: string;
  status: string;
  created_fk_by: string;
  discount_type: string;
}

export interface IDiscountInsert
{
  created_fk_by: string;
  description: string;
  discount_type: string;
  discount_amount: number;
}

export interface IDiscountUpdate
{
  created_fk_by: string;
  description: string;
  discount_code_pk_id: string;
}
