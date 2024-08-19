import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-salary-step',
  templateUrl: './salary-step.component.html',
})
export class SalaryStepComponent implements OnInit {
  subcourse_id: any
  UserInfo = {} as IuserEditForm
  step: number
  test:string=history.state
  activateRoute = inject(ActivatedRoute)
  http = inject(HttpService)
  router=inject (Router)
  ngOnInit(): void {
    this.GetUserInfo()
    this.subcourse_id = this.activateRoute.snapshot?.paramMap.get('id');
    this.activateRoute.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.step = Number(res.step);
    });
  }
  GetUserInfo() {
    this.http.get(Domain.GetUsers, history.state.user_pk_id).subscribe((response) => {
      this.UserInfo = response
    })
  }
}
