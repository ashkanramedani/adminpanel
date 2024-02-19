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

const routes: Routes = [
  {path:'',component:AuditReportsComponent},
  {path:'ClassCancellationRegistration',component:ClassCancellationRegistrationComponent},
  {path:'EmployeeEntryExit',component:EmployeeEntryExitComponent},
  {path:'LeaveRegistration',component:LeaveRegistrationComponent },
  {path:'MissionRegistration',component: MissionRegistrationComponent},
  {path:'ProfessorsReports',component: ProfessorsReportsComponent},
  {path:'RemoteWorkRegistration',component:RemoteWorkRegistrationComponent },
  {path:'SubstituteTeacherRegistration',component:SubstituteTeacherRegistrationComponent },
  {path:'Survey',component:SurveyComponent },
  {path:'TeachersDelay',component:TeachersDelayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportsRoutingModule { }
