import { IEmployeesForm } from "./IEmployeesForm"

export interface IEmployeeEntryExit {
        created: IEmployeesForm
        description: string,
        status: number,
        fingerprint_scanner_pk_id: string
        Date: string
        Enter: string
        Exit: string
        EnNo: number
        created_fk_by:string
}