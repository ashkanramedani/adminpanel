import { IClass } from "./IClass"
import { IQuestions } from "./IQuestions"
import { IUsers } from "./IUsers"


export interface ISurvey {
    survey_pk_id: string
    title: string
    created: IUsers,
    classes: IClass
    questions: IQuestions[]
    visible: boolean,
    can_update: boolean,
    create_date: string
    delete_date: string,
    description: string,
    created_fk_by: string
    deleted: boolean
    priority: number
    can_deleted: boolean,
    update_date: boolean,
    expire_date: boolean,
    status: number,
    class_fk_id: string
}