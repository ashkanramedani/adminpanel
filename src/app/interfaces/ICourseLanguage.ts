import { IUsers } from "./IUsers"

export interface ICourseLanguageAll {
  description: string;
  status: string;
  priority: number;
  language_name: string;
  language_pk_id: string;
    created: IUsers
}
export interface ICourseLanguageSingle {
  priority: number;
  can_update: boolean;
  create_date: string;
  delete_date?: any;
  status: string;
  note: Note;
  language_name: string;
  deleted: boolean;
  visible: boolean;
  can_deleted: boolean;
  update_date?: any;
  expire_date?: any;
  description: string;
  language_pk_id: string;
  created_fk_by: string;
}
export interface Note {
}
export interface ICourseLanguageAdd {
  created_fk_by: string;
  description: string;
  language_name: string;
}
export interface ICourseLanguageUpdate {
  created_fk_by: string;
  description: string; 
  language_name: string;
  language_pk_id: string;
}
