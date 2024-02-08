import { environment } from '../../environments/environment';
export const Domain=
{
    "WebsiteUrl":"",
    "GetPost": `${environment.apiUrl}post`,
    "GetPostTopic": `${environment.apiUrl}post/get_post_topic`,
    "GetPostCategory": `${environment.apiUrl}category/all`,
    "GetTagList": `${environment.apiUrl}tag/all`,
    "DeletePost": `${environment.apiUrl}post`,
    "CreatePost": `${environment.apiUrl}post`,
    "GetSinglePost": `${environment.apiUrl}post/{topic}`,
    "GetEmployees": `${environment.apiUrl}user/employees`,
    "GroupDeletePost": `${environment.apiUrl}post`,
    "RoomPageData":`${environment.apiUrl}Room/Room`,
    "RoomsPageData":`${environment.apiUrl}Room/Rooms`,

}
