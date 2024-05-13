import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyAddComponent } from './salary-policy/salary-policy-add/salary-policy-add.component';
import { ProfessorsReportsComponent } from './professors-reports/professors-reports.component';

const routes: Routes = [
  {path:'salarypolicy',component:SalaryPolicyComponent},
  {path:'salarypolicy/add',component:SalaryPolicyAddComponent},

  {path:'professorsreports',component:ProfessorsReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
