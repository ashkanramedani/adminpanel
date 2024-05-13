export interface ICourseTypeForm {
    created_fk_by: string
    description: string,
    status: number,
    visible: boolean,
    priority: number,
    can_update: boolean,
    can_deleted: boolean,
    course_type_name: string,
    course_type_pk_id: string
}