import { environment } from '../../environments/environment';
export const Domain =
{
    "WebsiteUrl": "",
    "GetTagList": `${environment.apiUrl}tag/all`,

    "GetPost": `${environment.apiUrl}post`,
    "GetPostTopic": `${environment.apiUrl}post/get_post_topic`,
    "GetPostCategory": `${environment.apiUrl}category/all`,
    "DeletePost": `${environment.apiUrl}post`,
    "CreatePost": `${environment.apiUrl}post`,
    "PatchPost": `${environment.apiUrl}post/update`,
    "ChangeGroupStatus": `${environment.apiUrl}post/group-status-modifications-in-group-post`,
    "GetSinglePost": `${environment.apiUrl}post/{topic}`,

    "GetLibrary": `${environment.apiUrl}library`,
    "GetLibraryTopic": `${environment.apiUrl}library/get_library_topic`,
    "GetLibraryCategory": `${environment.apiUrl}category/all`,   
    "DeleteLibrary": `${environment.apiUrl}library`,
    "CreateLibrary": `${environment.apiUrl}library`,
    "PatchLibrary": `${environment.apiUrl}library/update`,
    "ChangeGroupLibraryStatus": `${environment.apiUrl}library/group-status-modifications-in-group-library`,
    "GetSingleLibrary": `${environment.apiUrl}library/{topic}`,

    "GetEmployees": `${environment.apiUrl}user/employees`,
    "GroupDeletePost": `${environment.apiUrl}post`,
    "GetTeachersDelay": `${environment.apiUrl}form/tardy_request/search`,
    "GetClassCancellation": `${environment.apiUrl}form/class_cancellation/search`,
    "GetTeachersDelaySingle": `${environment.apiUrl}form/tardy_request/search`,
    "GetEmployeeEntryExit": `${environment.apiUrl}form/fingerprint_scanner/search`,
    "GetLeaveRegistration": `${environment.apiUrl}form/leave_request/search`,
    "DeleteLeaveRegistration": `${environment.apiUrl}form/leave_request/delete`,
    "GetMissionRegistration": `${environment.apiUrl}form/business_trip/search`,
    "DeleteMissionRegistration": `${environment.apiUrl}form/business_trip/delete`,
    "GetProfessorsReports": `${environment.apiUrl}`,
    "GetRemoteWorkRegistration": `${environment.apiUrl}form/remote_request/search`,
    "DeleteRemoteWorkRegistration": `${environment.apiUrl}form/remote_request/delete`,
    "GetSubstituteTeacher": `${environment.apiUrl}form/teacher_replacement/search`,
    "DeleteSubstituteTeacher": `${environment.apiUrl}form/teacher_replacement/delete`,
    "GetSurvey": `${environment.apiUrl}form/survey/search`,

}
