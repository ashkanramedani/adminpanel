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
import { TeachersDelayAddComponent } from './teachers-delay/teachers-delay-add/teachers-delay-add.component';
import { EmployeeEntryExitAddComponent } from './employee-entry-exit/employee-entry-exit-add/employee-entry-exit-add.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesAddComponent } from './employees/employees-add/employees-add.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { RolesComponent } from './roles/roles.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { StudentsComponent } from './students/students.component';
import { CourseComponent } from './course/course.component';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { QuestionComponent } from './question/question.component';
import { QuestionAddComponent } from './question/question-add/question-add.component';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';
import { PaymentMethodAddComponent } from './payment-method/payment-method-add/payment-method-add.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { EmployeeEntryExitBulkAddComponent } from './employee-entry-exit/employee-entry-exit-bulk-add/employee-entry-exit-bulk-add.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
    declarations: [EmployeeEntryExitAddComponent, TeachersDelayAddComponent, ClassCancellationAddComponent, SubstituteTeacherAddComponent,
        RemoteWorkRegistrationAddComponent, LeaveRegistrationAddComponent, AuditReportsComponent, ClassCancellationRegistrationComponent,
        EmployeeEntryExitComponent, LeaveRegistrationComponent, MissionRegistrationComponent, ProfessorsReportsComponent,
        RemoteWorkRegistrationComponent, SubstituteTeacherRegistrationComponent, SurveyComponent, TeachersDelayComponent,
        MissionRegistrationAddComponent, EmployeesComponent, EmployeesAddComponent, RolesComponent, RoleAddComponent,
        StudentsComponent, StudentAddComponent, CourseComponent, CourseAddComponent, QuestionComponent, QuestionAddComponent,
         SalaryPolicyComponent, SalaryPolicyAddComponent, PaymentMethodAddComponent, PaymentMethodComponent,EmployeeEntryExitBulkAddComponent
    ],
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
