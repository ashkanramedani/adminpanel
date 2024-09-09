import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';
import { TardeyRequestComponent } from './tardey-request/tardey-request.component';
import { TardeyRequestAddComponent } from './tardey-request/tardey-request-add/tardey-request-add.component';
import { LeaveFormsComponent } from './leave-forms/leave-forms.component';
import { LeaveFormAddComponent } from './leave-forms/leave-form-add/leave-form-add.component';
import { BusinessTripComponent } from './business-trip/business-trip.component';
import { BusinessTripAddComponent } from './business-trip/business-trip-add/business-trip-add.component';
import { RemoteRequestComponent } from './remote-request/remote-request.component';
import { FingerprintScannerComponent } from './fingerprint-scanner/fingerprint-scanner.component';
import { RemoteRequestAddComponent } from './remote-request/remote-request-add/remote-request-add.component';
import { FingerprintScannerAddComponent } from './fingerprint-scanner/fingerprint-scanner-add/fingerprint-scanner-add.component';
import { CourseCancellationComponent } from './course-cancellation/course-cancellation.component';
import { CourseCancellationAddComponent } from './course-cancellation/course-cancellation-add/course-cancellation-add.component';
import { SessionCancellationComponent } from './session-cancellation/session-cancellation.component';
import { SessionCancellationAddComponent } from './session-cancellation/session-cancellation-add/session-cancellation-add.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyAddComponent } from './survey/survey-add/survey-add.component';
import { FingerprintScannerBulkComponent } from './fingerprint-scanner/fingerprint-scanner-bulk/fingerprint-scanner-bulk.component';
import { EmployeesSalaryComponent } from './employees-salary/employees-salary.component';
import { EmployeesSalaryStepsComponent } from './employees-salary/employees-salary-steps/employees-salary-steps.component';
import { TeachersSalaryComponent } from './teachers-salary/teachers-salary.component';
import { TeacherSubCourseComponent } from './teachers-salary/teacher-sub-course/teacher-sub-course.component';
import { SubRequestComponent } from './sub-request/sub-request.component';
import { SubRequestAddComponent } from './sub-request/sub-request-add/sub-request-add.component';
import { TeacherSessionsComponent } from './teachers-salary/teacher-sessions/teacher-sessions.component';
import { SalaryStepComponent } from './teachers-salary/salary-step/salary-step.component';
import { SupervisorCourseComponent } from './supervisor/supervisor-course/supervisor-course.component';
import { SupervisorSubCourseComponent } from './supervisor/supervisor-sub-course/supervisor-sub-course.component';
import { SupervisorComponent } from './supervisor/supervisor.component';

const routes: Routes = [
  {path:'salarypolicy',component:SalaryPolicyComponent},
  {path:'salarypolicy/add',component:SalaryPolicyAddComponent},
  {path:'salarypolicy/edit/:id',component:SalaryPolicyAddComponent},

  {path:'tardy_request',component:TardeyRequestComponent},
  {path:'tardy_request/add',component:TardeyRequestAddComponent},
  {path:'tardy_request/edit/:id',component:TardeyRequestAddComponent},

  {path:'leave_request',component:LeaveFormsComponent},
  {path:'leave_request/add',component:LeaveFormAddComponent},
  {path:'leave_request/edit/:id',component:LeaveFormAddComponent},

  {path:'business_trip',component:BusinessTripComponent},
  {path:'business_trip/add',component:BusinessTripAddComponent},
  {path:'business_trip/edit/:id',component:BusinessTripAddComponent},

{path:'remote_request',component:RemoteRequestComponent},
{path:'remote_request/add',component:RemoteRequestAddComponent},
{path:'remote_request/edit/:id',component:RemoteRequestAddComponent},

{path:'finger_scanner',component:FingerprintScannerComponent},
{path:'finger_scanner/bulk',component:FingerprintScannerBulkComponent},
{path:'finger_scanner/add',component:FingerprintScannerAddComponent},
{path:'finger_scanner/edit/:id',component:FingerprintScannerAddComponent},

{path:'sub_request',component:SubRequestComponent},
{path:'sub_request/add',component:SubRequestAddComponent},
{path:'sub_request/edit/:id',component:SubRequestAddComponent},

// {path:'class_cancellation',component:CourseCancellationComponent},
// {path:'class_cancellation/add',component:CourseCancellationAddComponent},
// {path:'class_cancellation/edit/:id',component:CourseCancellationAddComponent},

{path:'session_cancellation',component:SessionCancellationComponent},
{path:'session_cancellation/add',component:SessionCancellationAddComponent},
{path:'session_cancellation/edit/:id',component:SessionCancellationAddComponent},

{path:'survey',component:SurveyComponent},
{path:'survey/add',component:SurveyAddComponent},
{path:'survey/edit/:id',component:SurveyAddComponent},

{path:'supervisor-review/:id',component:SupervisorComponent},
{path:'supervisor-course',component:SupervisorCourseComponent},
{path:'supervisor-subcourse/:id',component:SupervisorSubCourseComponent},

{path:'employees-salary',component:EmployeesSalaryComponent},
{path:'employees-salary/:id',component:EmployeesSalaryStepsComponent},

{path:'teachers-salary',component:TeachersSalaryComponent},
{path:'teachers-salary/sub-course/:id',component:TeacherSubCourseComponent},
{path:'teachers-salary/session/:id',component:TeacherSessionsComponent},
{path:'teacher-salary/:id',component:SalaryStepComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
