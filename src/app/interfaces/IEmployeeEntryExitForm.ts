export interface IEmployeeEntryExitForm {
    created_fk_by: string
    description: string,
    status: number,
    // visible: boolean,
    // priority: number,
    // can_update: boolean,
    // can_deleted: boolean,
    EnNo: number,
    Name: string,
    Date: string
    Enter: string
    Exit: string
    fingerprint_scanner_pk_id: string
}