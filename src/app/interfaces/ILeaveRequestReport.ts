export interface ILeaveRequestReport {
  visible: boolean;
  create_date: string;
  created_fk_by: string;
  update_date?: any;
  user_fk_id: string;
  delete_date?: any;
  start?: string;
  expire_date?: any;
  end?: string;
  priority: number;
  status: string;
  date: string;
  deleted: boolean;
  description: string;
  duration: number;
  can_update: boolean;
  note: Note;
  leave_type: string;
  can_deleted: boolean;
  leave_request_pk_id: string;
}
interface Note {
}
