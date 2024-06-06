import { environment } from '../../environments/environment';
export const Domain =
{
    "WebsiteUrl": "",
    "GetCount": `${environment.apiUrl}/api/v1/form/count`,
    "GetTagList": `${environment.apiUrl}/api/v1/tag/all`,

    "GetPost": `${environment.apiUrl}/api/v1/post`,
    "GetPostTopic": `${environment.apiUrl}/api/v1/post/get_post_topic`,
    "GetPostCategory": `${environment.apiUrl}/api/v1/category/all`,
    "DeletePost": `${environment.apiUrl}/api/v1/post`,
    "CreatePost": `${environment.apiUrl}/api/v1/post`,
    "PatchPost": `${environment.apiUrl}/api/v1/post/update`,
    "ChangeGroupStatus": `${environment.apiUrl}/api/v1/post/group-status-modifications-in-group-post`,
    "GetSinglePost": `${environment.apiUrl}/api/v1/post/{topic}`,
    "GetLibrary": `${environment.apiUrl}/api/v1/form/library`,
    "GetLibraryTopic": `${environment.apiUrl}/api/v1/form/library/get_library_topic`,
    "GetLibraryCategory": `${environment.apiUrl}/api/v1/form/category/all`,
    "DeleteLibrary": `${environment.apiUrl}/api/v1/form/library`,
    "CreateLibrary": `${environment.apiUrl}/api/v1/form/library`,
    "PatchLibrary": `${environment.apiUrl}/api/v1/form/library/update`,
    "ChangeGroupLibraryStatus": `${environment.apiUrl}/api/v1/form/library/group-status-modifications-in-group-library`,
    "GetSingleLibrary": `${environment.apiUrl}/api/v1/form/library/{topic}`,

    "GetEmployees": `${environment.apiUrl}/api/v1/user/employees`,
    "GroupDeletePost": `${environment.apiUrl}/api/v1/form/post`,


    "GetTardeyRequest": `${environment.apiUrl}/api/v1/form/tardy_request/search`,
    "CreateTardeyRequest": `${environment.apiUrl}/api/v1/form/tardy_request/add`,
    "PutTardeyRequest": `${environment.apiUrl}/api/v1/form/tardy_request/update`,
    "DeleteTardeyRequest": `${environment.apiUrl}/api/v1/form/tardy_request/delete`,

    "GetClassCancellation": `${environment.apiUrl}/api/v1/form/course_cancellation/search`,
    "DeleteClassCancellation": `${environment.apiUrl}/api/v1/form/course_cancellation/delete`,
    "CreateClassCancellation": `${environment.apiUrl}/api/v1/form/course_cancellation/add`,
    "GetSingleClassCancellation": `${environment.apiUrl}/api/v1/form/course_cancellation/search`,
    "PutClassCancellation": `${environment.apiUrl}/api/v1/form/course_cancellation/update`,

    "GetFingerScanner": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/search`,
    "CreateFingerScanner": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/add`,
    "CreateFingerScannerBulk": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/bulk_add`,
    "DeleteFingerScanner": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/delete`,
    "PutFingerScanner": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/update`,


    "GetLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/search`,
    "DeleteLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/delete`,
    "CreateLeaveRequest":`${environment.apiUrl}/api/v1/form/leave_request/add`,
    "PutLeaveRequest" :`${environment.apiUrl}/api/v1/form/leave_request/update`,


    "GetBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/search`,
    "DeleteBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/delete`,
    "PutBusinessTrip":`${environment.apiUrl}/api/v1/form/business_trip/update`,
    "CreateBusinessTrip":`${environment.apiUrl}/api/v1/form/business_trip/add`,

    "GetProfessorsReports": `${environment.apiUrl}/api/v1/form/salary/employee`,

    "GetRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/search`,
    "CreateRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/add`,
    "PutRemoteRequest":`${environment.apiUrl}/api/v1/form/remote_request/update`,
    "DeleteRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/delete`,

    "GetTeacherReplacement": `${environment.apiUrl}/api/v1/form/teacher_replacement/search`,
    "CreateTeacherReplacement": `${environment.apiUrl}/api/v1/form/teacher_replacement/add`,
    "DeleteTeacherReplacement": `${environment.apiUrl}/api/v1/form/teacher_replacement/delete`,
    "PutTeacherReplacement":`${environment.apiUrl}/api/v1/form/teacher_replacement/update`,

    "GetSession": `${environment.apiUrl}/api/v1/form/session/search`,
    "CreateSession": `${environment.apiUrl}/api/v1/form/session/add`,
    "DeleteSession": `${environment.apiUrl}/api/v1/form/session/delete`,
    "PutSesssion":`${environment.apiUrl}/api/v1/form/session/update`,

    "GetSurvey": `${environment.apiUrl}/api/v1/form/survey/search`,
    "DeleteSurvey": `${environment.apiUrl}/api/v1/form/survey/delete`,

    "GetStudentData" :`${environment.apiUrl}/api/v1/form/student/search`,
    "DeleteStudentData" :`${environment.apiUrl}/api/v1/form/student/delete`,
    "PutStudentData" :`${environment.apiUrl}/api/v1/form/student/update`,
    "CreateStudentData" :`${environment.apiUrl}/api/v1/form/student/add`,

    "GetPaymentMethodData" :`${environment.apiUrl}/api/v1/form/payment_method/search`,
    "DeletePaymentMethodData" :`${environment.apiUrl}/api/v1/form/payment_method/delete`,
    "PutPaymentMethodData" :`${environment.apiUrl}/api/v1/form/payment_method/update`,
    "CreatePaymentMethodData" :`${environment.apiUrl}/api/v1/form/payment_method/add`,

    "GetcourseData" :`${environment.apiUrl}/api/v1/form/course/search`,
    "DeletecourseData" :`${environment.apiUrl}/api/v1/form/course/delete`,
    "PutcourseData" :`${environment.apiUrl}/api/v1/form/course/update`,
    "CreatecourseData" :`${environment.apiUrl}/api/v1/form/course/add`,


    "GetSubCourseData" :`${environment.apiUrl}/api/v1/form/sub_course/search`,
    "DeleteSubCourseData" :`${environment.apiUrl}/api/v1/form/sub_course/delete`,
    "PutSubCourseData" :`${environment.apiUrl}/api/v1/form/sub_course/update`,
    "CreateSubCourseData" :`${environment.apiUrl}/api/v1/form/sub_course/add`,

    "GetQuestionData" :`${environment.apiUrl}/api/v1/form/question/search`,
    "DeleteQuestionData" :`${environment.apiUrl}/api/v1/form/question/delete`,
    "PutQuestionData" :`${environment.apiUrl}/api/v1/form/question/update`,
    "CreateQuestionData" :`${environment.apiUrl}/api/v1/form/question/add`,

    "GetCourseTagData" :`${environment.apiUrl}/api/v1/form/tag/search`,
    "DeleteCourseTagData" :`${environment.apiUrl}/api/v1/form/tag/delete`,
    "PutCourseTagData" :`${environment.apiUrl}/api/v1/form/tag/update`,
    "CreateCourseTagData" :`${environment.apiUrl}/api/v1/form/tag/add`,

    "GetCourseLanguageData" :`${environment.apiUrl}/api/v1/form/language/search`,
    "DeleteCourseLanguageData" :`${environment.apiUrl}/api/v1/form/language/delete`,
    "PutCourseLanguageData" :`${environment.apiUrl}/api/v1/form/language/update`,
    "CreateCourseLanguageData" :`${environment.apiUrl}/api/v1/form/language/add`,

    "GetRolesData" :`${environment.apiUrl}/api/v1/form/role/search`,
    "DeleteRolesData" :`${environment.apiUrl}/api/v1/form/role/delete`,
    "PutRolesData" :`${environment.apiUrl}/api/v1/form/role/update`,
    "CreateRolesData" :`${environment.apiUrl}/api/v1/form/role/add`,

    "GetUsers" :`${environment.apiUrl}/api/v1/employee/search`,
    "DeleteUsers" :`${environment.apiUrl}/api/v1/employee/delete`,
    "PutUsers" :`${environment.apiUrl}/api/v1/employee/update`,
    "CreateUsers" :`${environment.apiUrl}/api/v1/employee/add`,

    "GetSalaryPolicyData" :`${environment.apiUrl}/api/v1/form/SalaryPolicy/search`,
    "DeleteSalaryPolicyData" :`${environment.apiUrl}/api/v1/form/SalaryPolicy/delete`,
    "PutSalaryPolicyData" :`${environment.apiUrl}/api/v1/form/SalaryPolicy/update`,
    "CreateSalaryPolicyData" :`${environment.apiUrl}/api/v1/form/SalaryPolicy/add`,

    "GetCourseCategoryData" :`${environment.apiUrl}/api/v1/form/category/search`,
    "DeleteCourseCategoryData" :`${environment.apiUrl}/api/v1/form/category/delete`,
    "PutCourseCategoryData" :`${environment.apiUrl}/api/v1/form/category/update`,
    "CreateCourseCategoryData" :`${environment.apiUrl}/api/v1/form/category/add`,

    "GetCourseType" :`${environment.apiUrl}/api/v1/form/course_type/search`,
    "DeleteCourseType" :`${environment.apiUrl}/api/v1/form/course_type/delete`,
    "PutCourseType" :`${environment.apiUrl}/api/v1/form/course_type/update`,
    "CreateCourseType" :`${environment.apiUrl}/api/v1/form/course_type/add`,

    "GetRoleCluster" :`${environment.apiUrl}/api/v1/form/role/cluster`,

    "GetAuditClass":`${environment.apiUrl}/api/v1/form/course/search`,



}
