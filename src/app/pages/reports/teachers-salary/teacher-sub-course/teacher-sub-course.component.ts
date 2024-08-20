import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ITeachersSubCourse } from 'src/app/interfaces/ITeachersSalary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-sub-course',
  templateUrl: './teacher-sub-course.component.html',
})
export class TeacherSubCourseComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: ITeachersSubCourse[] = []
  form_title = "گزارشات /   محاسبات حقوقی اساتید "
  table_header: string[] = ["ردیف", "  نام زیر درس", "  تعداد استاد", "وضعیت"]
  get_all_route: string = Domain.GetTeacherSubCourse
  SearchValue: string
  id: any
  //#endregion
  isLoading: boolean = true
  private http = inject(HttpService)
  private alertServices = inject(AlertifyService)
  private activeRroute = inject(ActivatedRoute)
  private router = inject(Router)
  ngOnInit(): void {
    this.id = this.activeRroute.snapshot?.paramMap.get('id');
    this.GetResponseData()
  }

  GetResponseData() {
    this.isLoading = true;
    this.http.get(`${this.get_all_route}`, this.id).subscribe((response) => {
      this.ResponseDataList = response;
      this.isLoading = false
      console.log(response)
    })
  }
  changeRoute(Have_Salary_Record: boolean, course_id: string, sub_course_pk_id: string, user_pk_id: string) {
    localStorage.setItem("user_pk_id",user_pk_id)
    //محاسبه شده
    if (Have_Salary_Record) {
      this.getCourseInfo(course_id)

      this.router.navigate(['/reports/teacher-salary/' + sub_course_pk_id], { queryParams: { step: 6 } })
    }
    else {
      this.getCourseInfo(course_id)
      this.router.navigate(['/reports/teacher-salary/' + sub_course_pk_id], { queryParams: { step: 1 } })
    }
  }
  getCourseInfo(course_id: string) {
    this.http.get(Domain.GetcourseData, course_id).subscribe((response) => {
      localStorage.setItem("course_info",JSON.stringify( response))
    })

  }
}


