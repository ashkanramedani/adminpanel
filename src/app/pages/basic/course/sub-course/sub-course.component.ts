
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISubCourseAll, ISubCourseSingle } from 'src/app/interfaces/ISubCourse';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html'
})
export class SubCourseComponent implements OnInit {


  //#region change this informaion
  ResponseDataList: ISubCourseAll[] = []
  SingleData: ISubCourseSingle
  form_title = "اطلاعات پایه /  دوره های درس"
  table_header: string[] = ["ردیف", "نام دوره", "درس اصلی ", "استاد","تعداد جلسات","وضعیت","عملیات"]
  field_count:string="Sub_Course"
  get_all_route:string=Domain.GetSubCourseData
  delete_route:string=Domain.DeleteSubCourseData
  add_url:string="/basic/sub-course/add"
  edit_url:string="/basic/sub-course/edit"
  //#endregion
  ResponseDataLenght: number[];
  totalCount: number = 0
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  order: string = "desc"
  IsShowenModal: boolean = false
   page:number=1
   limit:number=10
  currentPage: number = 1
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(0, 1000, this.order)
    this.GetResponseDataLenght()

  }

  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=${this.field_count}`).subscribe((response) => {
      this.totalCount = response
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page: number, limit: number, order: string) {
 this.isLoading = true;
    this.http.getAll(`${this.get_all_route}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;

      this.isLoading = false
      console.log(response)
    })
  }

  RemoveItem(id?: string,course_id?:string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${this.delete_route}/${id}?course_id=${course_id}`)
          .subscribe((response) => {
            console.log(response);
              this.GetResponseData(0, 1000, this.order);
              this.alertServices.success('آیتم با موفقیت حذف شد');
          });
      },
      () => { }
    );
  }
  ChangeSort(value: any) {
    this.order = value.target.value
    this.GetResponseData(0, 1000, this.order);
  }

  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(this.get_all_route, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp) => {
          console.log("emp: " + emp)
          this.SingleData.created_fk_by = emp.name + " " + emp.last_name
        })
        this.http.get(Domain.GetUsers, this.SingleData.sub_course_teacher_fk_id).subscribe((teacher)=>
        {
          this.SingleData.sub_course_teacher_fk_id=teacher.name + " "+teacher.last_name
        })
        this.http.get(Domain.GetcourseData,this.SingleData.course_fk_id).subscribe((cls) => {
          this.SingleData.course_fk_id=cls.course_name
        })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}
