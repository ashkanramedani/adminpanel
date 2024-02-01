import { environment } from '../../environments/environment';
export const Domain=
{
    "WebsiteUrl":"",
    "GetPost": `${environment.apiUrl}post`,
    "GetPostTopic": `${environment.apiUrl}post/get_post_topic`,
    "GetPostCategory": `${environment.apiUrl}category/all`,
    "GetTagList": `${environment.apiUrl}tag/all`,
    "DeletePost": `${environment.apiUrl}post`,
    "RoomPageData":`${environment.apiUrl}Room/Room`,
    "RoomsPageData":`${environment.apiUrl}Room/Rooms`,

}
