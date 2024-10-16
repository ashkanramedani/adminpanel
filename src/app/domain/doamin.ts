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
  "GetDropDowUser": `${environment.apiUrl}/api/v1/dropdown/user`,
  "GroupDeletePost": `${environment.apiUrl}/api/v1/form/post`,


  "GetTardeyRequest": `${environment.apiUrl}/api/v1/form/tardy_request/search`,
 "GetTardeyReport": `${environment.apiUrl}/api/v1/form/tardy_request/report`,
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
  "GetFingerScannerReport": `${environment.apiUrl}/api/v1/form/fingerprint_scanner/report`,


  "GetLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/search`,
  "DeleteLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/delete`,
  "CreateLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/add`,
  "PutLeaveRequest": `${environment.apiUrl}/api/v1/form/leave_request/update`,
  "PutLeaveRequestVerify": `${environment.apiUrl}/api/v1/form/leave_request/verify`,
  "GetLeaveRequestReport": `${environment.apiUrl}/api/v1/form/leave_request/report`,


  "GetBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/search`,
  "DeleteBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/delete`,
  "PutBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/update`,
  "PutBusinessTripVerify": `${environment.apiUrl}/api/v1/form/business_trip/verify`,
  "CreateBusinessTrip": `${environment.apiUrl}/api/v1/form/business_trip/add`,
  "GetBusinessReport": `${environment.apiUrl}/api/v1/form/business_trip/report`,

  "PostEmployeesSalary": `${environment.apiUrl}/api/v1/form/salary/employee`,

  "GetRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/search`,
  "CreateRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/add`,
  "PutRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/update`,
  "PutRemoteRequestVerify": `${environment.apiUrl}/api/v1/form/remote_request/verify`,
  "DeleteRemoteRequest": `${environment.apiUrl}/api/v1/form/remote_request/delete`,
  "GetRemoteRequestReport": `${environment.apiUrl}/api/v1/form/remote_request/report`,

  "GetSubRequest": `${environment.apiUrl}/api/v1/form/sub_request/search`,
  "CreateSubRequest": `${environment.apiUrl}/api/v1/form/sub_request/add`,
  "DeleteSubRequest": `${environment.apiUrl}/api/v1/form/sub_request/delete`,
  "PutSubRequest": `${environment.apiUrl}/api/v1/form/sub_request/update`,
"GetSubRequestReport": `${environment.apiUrl}/api/v1/form/sub_request/report`,
"PutSubRequestVerify": `${environment.apiUrl}/api/v1/form/sub_request/verify`,


  "GetSession": `${environment.apiUrl}/api/v1/form/session/search`,
  "CreateSession": `${environment.apiUrl}/api/v1/form/session/add`,
  "DeleteSession": `${environment.apiUrl}/api/v1/form/session/delete`,
  "PutSesssion": `${environment.apiUrl}/api/v1/form/session/update`,
  "GetSessionBySubCourseId" : `${environment.apiUrl}/api/v1/form/session/subcourse`,

  "GetWallet": `${environment.apiUrl}/api/v1/form/session/search`,


  "GetSingleSesssionCancellation": `${environment.apiUrl}/api/v1/form/sesssion_cancellation/search`,
  "GetSessionCancellation": `${environment.apiUrl}/api/v1/form/session_cancellation/search`,
  "GetSessionCancellationReport": `${environment.apiUrl}/api/v1/form/session_cancellation/report`,
  "DeleteSessionCancellation": `${environment.apiUrl}/api/v1/form/session_cancellation/delete`,
  "CreateSessionCancellation": `${environment.apiUrl}/api/v1/form/session_cancellation/add`,
  "PutSessionCancellation": `${environment.apiUrl}/api/v1/form/session_cancellation/update`,
  "GetSessionSubcourse": `${environment.apiUrl}/api/v1/form/session/subcourse`,

  "GetSurvey": `${environment.apiUrl}/api/v1/form/survey/search`,
  "DeleteSurvey": `${environment.apiUrl}/api/v1/form/survey/delete`,

  "GetStudentData": `${environment.apiUrl}/api/v1/form/student/search`,
  "DeleteStudentData": `${environment.apiUrl}/api/v1/form/student/delete`,
  "PutStudentData": `${environment.apiUrl}/api/v1/form/student/update`,
  "CreateStudentData": `${environment.apiUrl}/api/v1/form/student/add`,


  "GetStatus": `${environment.apiUrl}/api/v1/status/search`,
  "PutStatus": `${environment.apiUrl}/api/v1`,

  "GetDiscount": `${environment.apiUrl}/api/v1/form/discount_code/search`,
  "DeleteDiscount": `${environment.apiUrl}/api/v1/form/discount_code/delete`,
  "PutDiscount": `${environment.apiUrl}/api/v1/form/discount_code/update`,
  "CreateDiscount": `${environment.apiUrl}/api/v1/form/discount_code/add`,


  "GetPaymentMethodData": `${environment.apiUrl}/api/v1/form/payment_method/search`,
  "DeletePaymentMethodData": `${environment.apiUrl}/api/v1/form/payment_method/delete`,
  "PutPaymentMethodData": `${environment.apiUrl}/api/v1/form/payment_method/update`,
  "CreatePaymentMethodData": `${environment.apiUrl}/api/v1/form/payment_method/add`,

  "GetRewardCardData": `${environment.apiUrl}/api/v1/form/reward_card/search`,
  "DeleteRewardCardData": `${environment.apiUrl}/api/v1/form/reward_card/delete`,
  "PutRewardCardData": `${environment.apiUrl}/api/v1/form/reward_card/update`,
  "CreateRewardCardData": `${environment.apiUrl}/api/v1/form/reward_card/add`,

  "GetcourseData": `${environment.apiUrl}/api/v1/form/course/search`,
  "DeletecourseData": `${environment.apiUrl}/api/v1/form/course/delete`,
  "PutcourseData": `${environment.apiUrl}/api/v1/form/course/update`,
  "CreatecourseData": `${environment.apiUrl}/api/v1/form/course/add`,


  "GetSubCourseData": `${environment.apiUrl}/api/v1/form/sub_course/search`,
  "GetSubCourseByCourseId": `${environment.apiUrl}/api/v1/form/sub_course/course`,
  "DeleteSubCourseData": `${environment.apiUrl}/api/v1/form/sub_course/delete`,
  "PutSubCourseData": `${environment.apiUrl}/api/v1/form/sub_course/update`,
  "CreateSubCourseData": `${environment.apiUrl}/api/v1/form/sub_course/add`,

  "GetQuestionData": `${environment.apiUrl}/api/v1/form/question/search`,
  "DeleteQuestionData": `${environment.apiUrl}/api/v1/form/question/delete`,
  "PutQuestionData": `${environment.apiUrl}/api/v1/form/question/update`,
  "CreateQuestionData": `${environment.apiUrl}/api/v1/form/question/add`,

  "GetCourseTagData": `${environment.apiUrl}/api/v1/form/tag/search`,
  "DeleteCourseTagData": `${environment.apiUrl}/api/v1/form/tag/delete`,
  "PutCourseTagData": `${environment.apiUrl}/api/v1/form/tag/update`,
  "CreateCourseTagData": `${environment.apiUrl}/api/v1/form/tag/add`,

  "GetCourseLanguageData": `${environment.apiUrl}/api/v1/form/language/search`,
  "DeleteCourseLanguageData": `${environment.apiUrl}/api/v1/form/language/delete`,
  "PutCourseLanguageData": `${environment.apiUrl}/api/v1/form/language/update`,
  "CreateCourseLanguageData": `${environment.apiUrl}/api/v1/form/language/add`,

  "GetRolesData": `${environment.apiUrl}/api/v1/form/role/search`,
  "DeleteRolesData": `${environment.apiUrl}/api/v1/form/role/delete`,
  "PutRolesData": `${environment.apiUrl}/api/v1/form/role/update`,
  "CreateRolesData": `${environment.apiUrl}/api/v1/form/role/add`,

  "GetUsers": `${environment.apiUrl}/api/v1/employee/search`,
  "DeleteUsers": `${environment.apiUrl}/api/v1/employee/delete`,
  "PutUsers": `${environment.apiUrl}/api/v1/employee/update`,
  "CreateUsers": `${environment.apiUrl}/api/v1/employee/add`,

  "GetSalaryPolicyData": `${environment.apiUrl}/api/v1/form/SalaryPolicy/search`,
  "DeleteSalaryPolicyData": `${environment.apiUrl}/api/v1/form/SalaryPolicy/delete`,
  "PutSalaryPolicyData": `${environment.apiUrl}/api/v1/form/SalaryPolicy/update`,
  "CreateSalaryPolicyData": `${environment.apiUrl}/api/v1/form/SalaryPolicy/add`,

  "GetCourseCategoryData": `${environment.apiUrl}/api/v1/form/category/search`,
  "DeleteCourseCategoryData": `${environment.apiUrl}/api/v1/form/category/delete`,
  "PutCourseCategoryData": `${environment.apiUrl}/api/v1/form/category/update`,
  "CreateCourseCategoryData": `${environment.apiUrl}/api/v1/form/category/add`,

  "GetCourseType": `${environment.apiUrl}/api/v1/form/course_type/search`,
  "DeleteCourseType": `${environment.apiUrl}/api/v1/form/course_type/delete`,
  "PutCourseType": `${environment.apiUrl}/api/v1/form/course_type/update`,
  "CreateCourseType": `${environment.apiUrl}/api/v1/form/course_type/add`,

  "GetRoleCluster": `${environment.apiUrl}/api/v1/form/role/cluster`,

  "GetSalaryEmployee": `${environment.apiUrl}/api/v1/form/salary/employee`,
  "GetSalaryPermision": `${environment.apiUrl}/api/v1/form/salary/permissions`,
  "PutSalaryEmployeeUpdate": `${environment.apiUrl}/api/v1/form/salary/employee/update`,

  "GetTeacherCourse": `${environment.apiUrl}/api/v1/form/salary/teacher/courses`,
  "GetTeacherSubCourse": `${environment.apiUrl}/api/v1/form/salary/teacher/sub_courses`,
  "PostTeacherSummary": `${environment.apiUrl}/api/v1/form/salary/teacher/summary`,
  "GetNumberOfSubCourses": `${environment.apiUrl}/api/v1/form/salary/teacher/number_of_sub_courses`,
  "PutSalaryTeachertUpdate" : `${environment.apiUrl}/api/v1/form/salary/teacher/summary`,

  "PostSupervisor": `${environment.apiUrl}/api/v1/form/salary/teacher/supervisor_review`,
  "GetSupervisor": `${environment.apiUrl}/api/v1/form/salary/teacher/supervisor_review`,

  "Auth":{
    "SingIn": `${environment.IeltsdailyApi}/api/v1/auth/signin`,
    "OTP": `${environment.IeltsdailyApi}/api/v1/auth/otp`,
    "VerifyOTP": `${environment.IeltsdailyApi}/api/v1/auth/verifyotp`,
    "SingUp": `${environment.IeltsdailyApi}/api/v1/auth/signup`,
    "GetloggedInUser": `${environment.IeltsdailyApi}/api/v1/user`,
  }
}
