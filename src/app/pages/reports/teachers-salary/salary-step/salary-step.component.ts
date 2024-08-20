import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ICourseAll, ICourseSingle } from 'src/app/interfaces/ICourse';
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
  user_pk_id:string|null
courseResponse:any

  activateRoute = inject(ActivatedRoute)
  http = inject(HttpService)
  router=inject (Router)
  ngOnInit(): void {

    this.subcourse_id = this.activateRoute.snapshot?.paramMap.get('id');
    this.activateRoute.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.step = Number(res.step);
      this.user_pk_id=localStorage.getItem("user_pk_id")
    });
    this.GetUserInfo()
    this.courseResponse=JSON.parse( localStorage.getItem('course_info')|| '[]');
  }
  GetUserInfo() {
    this.http.get(Domain.GetUsers, this.user_pk_id).subscribe((response) => {
      this.UserInfo = response
    })
  }

}
