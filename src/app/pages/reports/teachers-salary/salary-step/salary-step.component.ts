import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  activateRoute = inject(ActivatedRoute)
  http = inject(HttpService)
  ngOnInit(): void {
    this.subcourse_id = this.activateRoute.snapshot?.paramMap.get('id');
    //this.GetUserInfo()
    this.activateRoute.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.step = Number(res.step);
    });
  }
  GetUserInfo() {
    this.http.get(Domain.GetUsers, this.subcourse_id).subscribe((response) => {
      this.UserInfo = response
    })
  }
}
