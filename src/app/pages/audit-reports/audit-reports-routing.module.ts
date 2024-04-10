import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditReportsComponent } from './audit-reports.component';
import { ClassCancellationRegistrationComponent } from './class-cancellation-registration/class-cancellation-registration.component';
import { EmployeeEntryExitComponent } from './employee-entry-exit/employee-entry-exit.component';
import { LeaveRegistrationComponent } from './leave-registration/leave-registration.component';
import { MissionRegistrationComponent } from './mission-registration/mission-registration.component';
import { ProfessorsReportsComponent } from './professors-reports/professors-reports.component';
import { RemoteWorkRegistrationComponent } from './remote-work-registration/remote-work-registration.component';
import { SubstituteTeacherRegistrationComponent } from './substitute-teacher-registration/substitute-teacher-registration.component';
import { SurveyComponent } from './survey/survey.component';
import { TeachersDelayComponent } from './teachers-delay/teachers-delay.component';
import { LeaveRegistrationAddComponent } from './leave-registration/leave-registration-add/leave-registration-add.component';
import { MissionRegistrationAddComponent } from './mission-registration/mission-registration-add/mission-registration-add.component';
import { RemoteWorkRegistrationAddComponent } from './remote-work-registration/remote-work-registration-add/remote-work-registration-add.component';
import { SubstituteTeacherAddComponent } from './substitute-teacher-registration/substitute-teacher-add/substitute-teacher-add.component';
import { ClassCancellationAddComponent } from './class-cancellation-registration/class-cancellation-add/class-cancellation-add.component';
import { TeachersDelayAddComponent } from './teachers-delay/teachers-delay-add/teachers-delay-add.component';
import { EmployeeEntryExitAddComponent } from './employee-entry-exit/employee-entry-exit-add/employee-entry-exit-add.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesAddComponent } from './employees/employees-add/employees-add.component';
import { RolesComponent } from './roles/roles.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { StudentsComponent } from './students/students.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { CourseComponent } from './course/course.component';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { QuestionComponent } from './question/question.component';
import { QuestionAddComponent } from './question/question-add/question-add.component';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';

const routes: Routes = [
  { path: '', component: AuditReportsComponent },

  { path: 'Employee', component: EmployeesComponent },
  { path: 'Employee/Add', component: EmployeesAddComponent },
  { path: 'Employee/edit/:id', component: EmployeesAddComponent },

  { path: 'Roles', component: RolesComponent },
  { path: 'Role/Add', component: RoleAddComponent },
  { path: 'Role/edit/:id', component: RoleAddComponent },

  { path: 'Question', component: QuestionComponent },
  { path: 'Question/Add', component: QuestionAddComponent },
  { path: 'Question/edit/:id', component: QuestionAddComponent },

  { path: 'Course', component: CourseComponent },
  { path: 'Course/Add', component: CourseAddComponent },
  { path: 'Course/edit/:id', component: CourseAddComponent },

  { path: 'Students', component: StudentsComponent },
  { path: 'Student/Add', component: StudentAddComponent },
  { path: 'Student/edit/:id', component: StudentAddComponent },
  
  { path: 'SalaryPolicy', component: SalaryPolicyComponent },
  { path: 'SalaryPolicy/Add', component: SalaryPolicyAddComponent },
  { path: 'SalaryPolicy/edit/:id', component: SalaryPolicyAddComponent },

  { path: 'ClassCancellationRegistration', component: ClassCancellationRegistrationComponent },
  { path: 'ClassCancellation/Add', component: ClassCancellationAddComponent },
  { path: 'ClassCancellation/edit/:id', component: ClassCancellationAddComponent },

  { path: 'EmployeeEntryExit', component: EmployeeEntryExitComponent },
  { path: 'EmployeeEntryExit/Add', component: EmployeeEntryExitAddComponent },
  { path: 'EmployeeEntryExit/edit/:id', component: EmployeeEntryExitAddComponent },
  
  { path: 'LeaveRegistration', component: LeaveRegistrationComponent },
  { path: 'LeaveRegistration/Add', component: LeaveRegistrationAddComponent },
  { path: 'LeaveRegistration/edit/:id', component: LeaveRegistrationAddComponent },

  { path: 'MissionRegistration/Add', component: MissionRegistrationAddComponent },
  { path: 'MissionRegistration/edit/:id', component: MissionRegistrationAddComponent },
  { path: 'MissionRegistration', component: MissionRegistrationComponent },

  { path: 'ProfessorsReports', component: ProfessorsReportsComponent },

  { path: 'RemoteWorkRegistration', component: RemoteWorkRegistrationComponent },
  { path: 'RemoteWorkRegistration/Add', component: RemoteWorkRegistrationAddComponent },
  { path: 'RemoteWorkRegistration/edit/:id', component: RemoteWorkRegistrationAddComponent },

  { path: 'SubstituteTeacherRegistration', component: SubstituteTeacherRegistrationComponent },
  { path: 'SubstituteTeacherRegistration/Add', component: SubstituteTeacherAddComponent },
  { path: 'SubstituteTeacherRegistration/edit/:id', component: SubstituteTeacherAddComponent },

  { path: 'Survey', component: SurveyComponent },
  
  { path: 'TeachersDelay', component: TeachersDelayComponent },
  { path: 'TeachersDelay/Add', component: TeachersDelayAddComponent },
  { path: 'TeachersDelay/edit/:id', component: TeachersDelayAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportsRoutingModule { }
