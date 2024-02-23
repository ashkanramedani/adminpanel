import { env } from '@ckeditor/ckeditor5-utils';
import { environment } from '../../environments/environment';
export const Domain =
{
    "WebsiteUrl": "",
    "GetPost": `${environment.apiUrl}post`,
    "GetPostTopic": `${environment.apiUrl}post/get_post_topic`,
    "GetPostCategory": `${environment.apiUrl}category/all`,
    "GetTagList": `${environment.apiUrl}tag/all`,
    "DeletePost": `${environment.apiUrl}post`,
    "CreatePost": `${environment.apiUrl}post`,
    "PatchPost": `${environment.apiUrl}post/update`,
    "ChangeGroupStatus": `${environment.apiUrl}post/group-status-modifications-in-group-post`,
    "GetSinglePost": `${environment.apiUrl}post/{topic}`,
    "GetEmployees": `${environment.apiUrl}user/employees`,
    "GroupDeletePost": `${environment.apiUrl}post`,
    "GetTeachersDelay": `${environment.AccountingApiUrl}tardy_request/search`,
    "GetClassCancellation": `${environment.AccountingApiUrl}class_cancellation/search`,
    "GetTeachersDelaySingle": `${environment.AccountingApiUrl}tardy_request/search`,
    "GetEmployeeEntryExit": `${environment.AccountingApiUrl}fingerprint_scanner/search`,
    "GetLeaveRegistration": `${environment.AccountingApiUrl}leave_request/search`,
    "GetMissionRegistration": `${environment.AccountingApiUrl}business_trip/search`,
    "GetProfessorsReports": `${environment.AccountingApiUrl}`,
    "GetRemoteWorkRegistration": `${environment.AccountingApiUrl}remote_request/search`,
    "GetSubstituteTeacher": `${environment.AccountingApiUrl}teacher_replacement/search`,
    "GetSurvey": `${environment.AccountingApiUrl}survey/search`,

}
