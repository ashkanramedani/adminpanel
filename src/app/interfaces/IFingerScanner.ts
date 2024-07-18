import { IUsersForm } from "./IUsersForm"

export interface IFingerScannerAll {
    created: IUsersForm
    description: string,
    status: number,
    fingerprint_scanner_pk_id: string
    Date: string
    Enter: string
    Exit: string
    EnNo: number
}

export interface IFingerScannerSingle {

  fingerprint_scanner_pk_id: string;
  create_date: string;
  created_fk_by: string;
  update_date?: any;
  EnNo: number;
  delete_date?: any;
  Date: string;
  visible: boolean;
  expire_date?: any;
  Enter: string;
  priority: number;
  status: string;
  Exit: string;
  deleted: boolean;
  description: string;
  duration: number;
  can_update: boolean;
  note: Note;
}
interface Note {
}
