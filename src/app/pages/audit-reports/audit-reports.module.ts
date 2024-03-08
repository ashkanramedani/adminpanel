import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditReportsRoutingModule } from './audit-reports-routing.module';
import { RouterLink } from '@angular/router';
import { AuditReportsComponent } from './audit-reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassCancellationRegistrationComponent } from './class-cancellation-registration/class-cancellation-registration.component';
import { EmployeeEntryExitComponent } from './employee-entry-exit/employee-entry-exit.component';
import { LeaveRegistrationComponent } from './leave-registration/leave-registration.component';
import { MissionRegistrationComponent } from './mission-registration/mission-registration.component';
import { ProfessorsReportsComponent } from './professors-reports/professors-reports.component';
import { RemoteWorkRegistrationComponent } from './remote-work-registration/remote-work-registration.component';
import { SubstituteTeacherRegistrationComponent } from './substitute-teacher-registration/substitute-teacher-registration.component';
import { SurveyComponent } from './survey/survey.component';
import { TeachersDelayComponent } from './teachers-delay/teachers-delay.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeaveRegistrationAddComponent } from './leave-registration/leave-registration-add/leave-registration-add.component';
import { MissionRegistrationAddComponent } from './mission-registration/mission-registration-add/mission-registration-add.component';
import { RemoteWorkRegistrationAddComponent } from './remote-work-registration/remote-work-registration-add/remote-work-registration-add.component';
import { SubstituteTeacherAddComponent } from './substitute-teacher-registration/substitute-teacher-add/substitute-teacher-add.component';
import { ClassCancellationAddComponent } from './class-cancellation-registration/class-cancellation-add/class-cancellation-add.component';

@NgModule({
    declarations: [ClassCancellationAddComponent,SubstituteTeacherAddComponent,RemoteWorkRegistrationAddComponent,LeaveRegistrationAddComponent, AuditReportsComponent, ClassCancellationRegistrationComponent, EmployeeEntryExitComponent, LeaveRegistrationComponent, MissionRegistrationComponent, ProfessorsReportsComponent, RemoteWorkRegistrationComponent, SubstituteTeacherRegistrationComponent, SurveyComponent, TeachersDelayComponent,MissionRegistrationAddComponent],
    imports: [
        NgPersianDatepickerModule,
        CKEditorModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuditReportsRoutingModule,
        RouterLink,
        SharedModule,
    ]
})
export class AuditReportsModule { }
