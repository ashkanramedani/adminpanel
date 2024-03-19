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

const routes: Routes = [
  { path: '', component: AuditReportsComponent },

  { path: 'ClassCancellationRegistration', component: ClassCancellationRegistrationComponent },
  { path: 'ClassCancellation/Add', component: ClassCancellationAddComponent },
  { path: 'ClassCancellation/edit/:id', component: ClassCancellationAddComponent },

  { path: 'EmployeeEntryExit', component: EmployeeEntryExitComponent },

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
