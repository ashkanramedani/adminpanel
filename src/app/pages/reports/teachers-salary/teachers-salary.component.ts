import { Component, inject, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ITeachersCourse } from 'src/app/interfaces/ITeachersSalary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teachers-salary',
  templateUrl: './teachers-salary.component.html',
})
export class TeachersSalaryComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: ITeachersCourse[] = []
  form_title = "گزارشات /   محاسبات حقوقی اساتید "
  table_header: string[] = ["ردیف" ,"  نام درس","  زبان", " تعداد زیر درس","تاریخ اتمام","عملیات"]
  get_all_route:string=Domain.GetTeacherCourse
  SearchValue:string
  //#endregion
  isLoading: boolean = true
  private http=inject(HttpService)
  private alertServices=inject(AlertifyService)
  ngOnInit(): void {
    this.GetResponseData()
  }

  GetResponseData() {
 this.isLoading = true;
    this.http.getAll(`${this.get_all_route}`).subscribe((response) => {
      this.ResponseDataList = response;
      this.isLoading = false
      console.log(response)
    })
  }

}

