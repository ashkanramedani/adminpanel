
export interface IFingerScannerReport {
  Invalid: number;
  TotalHour: number;
  Fingerprint_scanner_report: Fingerprintscannerreport[];
}
export interface Fingerprintscannerreport {
  update_date?: string;
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
  can_deleted: boolean;
  fingerprint_scanner_pk_id: string;
  create_date: string;
  created_fk_by: string;
}
export interface Note {
}
