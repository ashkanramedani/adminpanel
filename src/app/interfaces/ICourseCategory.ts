import { IUsers } from "./IUsers"

export interface ICourseCategoryAll{
  created_fk_by: string;
  description: string;
  category_name: string;
  category_pk_id: string;
        created: IUsers
}

export interface ICourseCategorySingle{

  visible: boolean;
  deleted: boolean;
  can_deleted: boolean;
  update_date?: any;
  expire_date?: any;
  description: string;
  category_pk_id: string;
  created_fk_by: string;
  priority: number;
  can_update: boolean;
  create_date: string;
  delete_date?: any;
  status: string;
  note: Note;
  category_name: string;
}
interface Note {
}


export interface ICourseCategoryAdd{
  created_fk_by: string;
  description: string;
  category_name: string;
}

export interface ICourseCategoryUpdate{
  created_fk_by: string;
  description: string; 
  category_name: string;
  category_pk_id: string;
}
