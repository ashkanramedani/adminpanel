import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ITeachersSubCourse } from 'src/app/interfaces/ITeachersSalary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-sub-course',
  templateUrl: './teacher-sub-course.component.html',
})
export class TeacherSubCourseComponent  implements OnInit {
  //#region change this informaion
  ResponseDataList: ITeachersSubCourse[] = []
  form_title = "گزارشات /   محاسبات حقوقی اساتید "
  table_header: string[] = ["ردیف" ,"  نام زیر درس","  تعداد استاد","وضعیت"]
  get_all_route:string=Domain.GetTeacherSubCourse
  SearchValue:string
  id:any
  //#endregion
  isLoading: boolean = true
  private http=inject(HttpService)
  private alertServices=inject(AlertifyService)
  private route =inject(ActivatedRoute)
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetResponseData()
  }

  GetResponseData() {
 this.isLoading = true;
    this.http.get(`${this.get_all_route}`,this.id).subscribe((response) => {
      this.ResponseDataList = response;
      this.isLoading = false
      console.log(response)
    })
  }

}


