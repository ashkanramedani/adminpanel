import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { BusinessTripComponent } from './business-trip/business-trip.component';
import { BusinessTripAddComponent } from './business-trip/business-trip-add/business-trip-add.component';
import { CourseCancellationComponent } from './course-cancellation/course-cancellation.component';
import { CourseCancellationAddComponent } from './course-cancellation/course-cancellation-add/course-cancellation-add.component';
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
import { TeacherReplacementComponent } from './teacher-replacement/teacher-replacement.component';
import { TeacherReplacementAddComponent } from './teacher-replacement/teacher-replacement-add/teacher-replacement-add.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfessorsReportsComponent } from './professors-reports/professors-reports.component';
import { FingerprintScannerBulkComponent } from './fingerprint-scanner/fingerprint-scanner-bulk/fingerprint-scanner-bulk.component';
import { OnlyNumberDirective } from 'src/app/directive/only_number.directive';
import { ProfessorsreportStepComponent } from './professors-reports/professorsreport-step/professorsreport-step.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessTripStepComponent } from './professors-reports/business-trip-step/business-trip-step.component';
import { FingerPrintStepComponent } from './professors-reports/finger-print-step/finger-print-step.component';
import { LeaveRequestStepComponent } from './professors-reports/leave-request-step/leave-request-step.component';
import { PaySlipStepComponent } from './professors-reports/pay-slip-step/pay-slip-step.component';
import { RemoteRequestStepComponent } from './professors-reports/remote-request-step/remote-request-step.component';

@NgModule({
  declarations: [BusinessTripComponent, BusinessTripAddComponent, CourseCancellationComponent, CourseCancellationAddComponent,
    FingerprintScannerComponent, FingerprintScannerAddComponent, FingerprintScannerBulkComponent, LeaveFormsComponent, LeaveFormAddComponent, RemoteRequestComponent,
    RemoteRequestAddComponent, SalaryPolicyComponent, SalaryPolicyAddComponent, SurveyComponent, SurveyAddComponent, TardeyRequestComponent,
    TardeyRequestAddComponent, TeacherReplacementComponent, TeacherReplacementAddComponent, ProfessorsReportsComponent, OnlyNumberDirective, ProfessorsreportStepComponent,
    BusinessTripStepComponent, FingerPrintStepComponent, LeaveRequestStepComponent, PaySlipStepComponent, RemoteRequestStepComponent
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
