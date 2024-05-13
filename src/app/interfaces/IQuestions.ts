import { IUsersForm } from "./IUsersForm"

export interface IQuestions {
    question_pk_id: string
    text: string
    language: string
    created_fk_by: string
    description: string
    status: number,
    created: IUsersForm
    priority: number,
    deleted: boolean,
    can_deleted: boolean,
    update_date: boolean,
    expire_date: string,
    can_update: boolean,
    visible: boolean,
    create_date: string
    delete_date: string
}