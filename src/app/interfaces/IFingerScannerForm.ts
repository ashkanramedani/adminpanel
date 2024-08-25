export interface IFingerScannerAdd {
  created_fk_by: string;
  description: string;
  Date: string;
  Enter: string;
  Exit: string;
  user_fk_id: string;
}
export interface IFingerScannerUpdate {
  created_fk_by: string;
  description: string;
  Enter: string;
  Exit: string;
  fingerprint_scanner_pk_id: string;
}
