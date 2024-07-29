import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ILibrary } from 'src/app/interfaces/ILibrary';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employees-salary-steps',
  templateUrl: './employees-salary-steps.component.html',
})
export class EmployeesSalaryStepsComponent implements OnInit {
  //#region change this informaion
  SingleData: ILibrary
  title: string = '';
  form_title: string = "گزارشات / مالی /   محاسبات حقوقی پرسنل"

  step: number
  add_url: string = ""
  edit_url: string = ""
  table_header: string[] = []
  UserInfo = {} as IuserEditForm
  //#endregion
  ResponseDataLenght: number[];
  totalCount: number = 0
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  order: string = "desc"
  IsShowenModal: boolean = false
  page: number = 1
  limit: number = 10
  currentPage: number = 1
  id: any
  year: number
  month: number

  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot?.paramMap.get('id');
    this.GetUserInfo()
    this.activateRoute.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.step = Number(res.step);
      this.year = res.year;
      this.month = res.month;
    });


  }
  GetUserInfo() {
    this.http.get(Domain.GetUsers, this.id).subscribe((response) => {
      this.UserInfo = response
    })
  }



}
