import { IUser } from "./IUser"

export interface IEmployeeEntryExit {
    created_fk_by: string
    description: string
    status: number
    EnNo: number
    Name: string
    Date: string
    Enter: string
    Exit: string
    fingerprint_scanner_pk_id: string
}