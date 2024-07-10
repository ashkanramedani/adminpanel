import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';
import { ProfessorsReportsComponent } from './professors-reports/professors-reports.component';
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
import { TeacherReplacementComponent } from './teacher-replacement/teacher-replacement.component';
import { TeacherReplacementAddComponent } from './teacher-replacement/teacher-replacement-add/teacher-replacement-add.component';
import { CourseCancellationComponent } from './course-cancellation/course-cancellation.component';
import { CourseCancellationAddComponent } from './course-cancellation/course-cancellation-add/course-cancellation-add.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyAddComponent } from './survey/survey-add/survey-add.component';
import { FingerprintScannerBulkComponent } from './fingerprint-scanner/fingerprint-scanner-bulk/fingerprint-scanner-bulk.component';
import { ProfessorsreportStepComponent } from './professors-reports/professorsreport-step/professorsreport-step.component';

const routes: Routes = [
  {path:'salarypolicy',component:SalaryPolicyComponent},
  {path:'salarypolicy/add',component:SalaryPolicyAddComponent},
  {path:'salarypolicy/edit/:id',component:SalaryPolicyAddComponent},

  {path:'tardy_request',component:TardeyRequestComponent},
  {path:'tardy_request/add',component:TardeyRequestAddComponent},
  {path:'tardy_request/edit/:id',component:TardeyRequestComponent},

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

{path:'teacher_replacement',component:TeacherReplacementComponent},
{path:'teacher_replacement/add',component:TeacherReplacementAddComponent},
{path:'teacher_replacement/edit/:id',component:TeacherReplacementAddComponent},

{path:'class_cancellation',component:CourseCancellationComponent},
{path:'class_cancellation/add',component:CourseCancellationAddComponent},
{path:'class_cancellation/edit/:id',component:CourseCancellationAddComponent},

{path:'survey',component:SurveyComponent},
{path:'survey/add',component:SurveyAddComponent},
{path:'survey/edit/:id',component:SurveyAddComponent},


{path:'professorsreports',component:ProfessorsReportsComponent},
{path:'professorsreport/:id',component:ProfessorsreportStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
