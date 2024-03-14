import { IClass } from "./IClass"
import { IQuestions } from "./IQuestions"
import { IUser } from "./IUser"

export interface ISurvey {
    survey_pk_id: string
    title: string
    created: IUser,
    classes: IClass
    questions: IQuestions[]
}