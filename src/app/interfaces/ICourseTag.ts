import { IUsers } from "./IUsers"


export interface ICourseTag{
        created_fk_by:string
        description: string,
        status: number,
        visible: boolean,
        priority: number,
        can_update: boolean,
        can_deleted: boolean,
        tag_name: string,
        tag_pk_id: string,
        created: IUsers
      
}