import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { BusinessTripComponent } from './business-trip/business-trip.component';
import { BusinessTripAddComponent } from './business-trip/business-trip-add/business-trip-add.component';
import { CourseCancellationComponent } from './course-cancellation/course-cancellation.component';
import { CourseCancellationAddComponent } from './course-cancellation/course-cancellation-add/course-cancellation-add.component';
import { SessionCancellationComponent } from './session-cancellation/session-cancellation.component';
import { SessionCancellationAddComponent } from './session-cancellation/session-cancellation-add/session-cancellation-add.component';
import { FingerprintScannerComponent } from './fingerprint-scanner/fingerprint-scanner.component';
import { FingerprintScannerAddComponent } from './fingerprint-scanner/fingerprint-scanner-add/fingerprint-scanner-add.component';
import { LeaveFormsComponent } from './leave-forms/leave-forms.component';
import { LeaveFormAddComponent } from './leave-forms/leave-form-add/leave-form-add.component';
import { RemoteRequestComponent } from './remote-request/remote-request.component';
import { RemoteRequestAddComponent } from './remote-request/remote-request-add/remote-request-add.component';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyAddComponent } from './survey/survey-add/survey-add.component';
import { TardeyRequestComponent } from './tardey-request/tardey-request.component';
import { TardeyRequestAddComponent } from './tardey-request/tardey-request-add/tardey-request-add.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FingerprintScannerBulkComponent } from './fingerprint-scanner/fingerprint-scanner-bulk/fingerprint-scanner-bulk.component';
import { OnlyNumberDirective } from 'src/app/directive/only_number.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessTripStepComponent } from './employees-salary/business-trip-step/business-trip-step.component';
import { FingerPrintStepComponent } from './employees-salary/finger-print-step/finger-print-step.component';
import { LeaveRequestStepComponent } from './employees-salary/leave-request-step/leave-request-step.component';
import { PaySlipStepComponent } from './employees-salary/pay-slip-step/pay-slip-step.component';
import { RemoteRequestStepComponent } from './employees-salary/remote-request-step/remote-request-step.component';
import { EmployeesSalaryComponent } from './employees-salary/employees-salary.component';
import { EmployeesSalaryStepsComponent } from './employees-salary/employees-salary-steps/employees-salary-steps.component';
import { TeachersSalaryComponent } from './teachers-salary/teachers-salary.component';
import { TeacherSubCourseComponent } from './teachers-salary/teacher-sub-course/teacher-sub-course.component';
import { SubRequestAddComponent } from './sub-request/sub-request-add/sub-request-add.component';
import { SubRequestComponent } from './sub-request/sub-request.component';
import { TeacherSessionsComponent } from './teachers-salary/teacher-sessions/teacher-sessions.component';
import { SalaryStepComponent } from './teachers-salary/salary-step/salary-step.component';
import { SecondStageComponent } from './teachers-salary/salary-step/second-stage/second-stage.component';
import { TeacherAbsentComponent } from './teachers-salary/salary-step/teacher-absent/teacher-absent.component';
import { TeacherCancellationComponent } from './teachers-salary/salary-step/teacher-cancellation/teacher-cancellation.component';
import { TeacherClassHolidayComponent } from './teachers-salary/salary-step/teacher-class-holiday/teacher-class-holiday.component';
import { TeacherPaySlipComponent } from './teachers-salary/salary-step/teacher-pay-slip/teacher-pay-slip.component';
import { TeacherSubRequestComponent } from './teachers-salary/salary-step/teacher-sub-request/teacher-sub-request.component';
import { TeacherTardeyComponent } from './teachers-salary/salary-step/teacher-tardey/teacher-tardey.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { SupervisorCourseComponent } from './supervisor/supervisor-course/supervisor-course.component';
import { SupervisorSubCourseComponent } from './supervisor/supervisor-sub-course/supervisor-sub-course.component';
import { DailyPaymentsComponent } from './daily-payments/daily-payments.component';
@NgModule({
  declarations: [DailyPaymentsComponent,BusinessTripComponent, BusinessTripAddComponent, TeacherSessionsComponent, SecondStageComponent, TeacherAbsentComponent, TeacherCancellationComponent,
    CourseCancellationComponent, CourseCancellationAddComponent, SalaryStepComponent, TeacherClassHolidayComponent, TeacherPaySlipComponent,
    SessionCancellationComponent, SessionCancellationAddComponent, TeacherSubRequestComponent, TeacherTardeyComponent, SupervisorComponent,
    FingerprintScannerComponent, FingerprintScannerAddComponent, FingerprintScannerBulkComponent, LeaveFormsComponent, LeaveFormAddComponent, RemoteRequestComponent,
    RemoteRequestAddComponent, SalaryPolicyComponent, SalaryPolicyAddComponent, SurveyComponent, SurveyAddComponent, TardeyRequestComponent,
    TardeyRequestAddComponent, TeachersSalaryComponent, SubRequestAddComponent, SubRequestComponent, EmployeesSalaryComponent, OnlyNumberDirective, EmployeesSalaryStepsComponent,
    BusinessTripStepComponent, FingerPrintStepComponent, TeacherSubCourseComponent, LeaveRequestStepComponent, PaySlipStepComponent, RemoteRequestStepComponent, SupervisorCourseComponent, SupervisorSubCourseComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgPersianDatepickerModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class ReportsModule { }
