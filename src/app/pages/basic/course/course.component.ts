
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ICourse } from 'src/app/interfaces/ICourse';
import { ICourseType } from 'src/app/interfaces/ICourseType';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit {
  ShowMoreItem: string
  ResponseDataList: ICourse[] = []
  ResponseDataLenght: number[];
  CourseTypeData:ICourseType[]=[]
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage: number = 1
  isOpenSettins:boolean=false
  order: string = "desc"
  type_pk_id:string
  SingleData: ICourse
  IsShowenModal: boolean = false
  is_active_course_type:string=''
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetCourseTypeData()
    this.GetResponseData(1, 10, this.order,"")
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=course`).subscribe((response) => {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  OpenSettins(){
    this.isOpenSettins=!this.isOpenSettins;
  }
  GetResponseData(page: number, limit: number, order: string,course_type:string) {
    this.isLoading = true
    this.is_active_course_type=course_type
    this.http.getAll(`${Domain.GetcourseData}?course_type=${course_type}&page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;
      console.log(response)
      this.currentPage = page
      this.isLoading = false;
    })
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  ChangeSort(value: any) {
    this.order = value.target.value
    this.GetResponseData(1, 10, this.order,"");
  }
  RemoveItem(id?: string) {
    this.ShowMoreItem=""
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeletecourseData}/${id}`)
          .subscribe((response) => {
            console.log(response);
              this.GetResponseData(1, 10, this.order,"");
              this.alertServices.success('آیتم با موفقیت حذف شد');
            //else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(Domain.GetcourseData, id)
      .subscribe((response) => {
        this.SingleData = response;
        console.log(response)
        this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp)=>
        {
          console.log("emp: "+emp)
          this.SingleData.created_fk_by=emp.name + " "+emp.last_name
        })
        this.http.get(Domain.GetCourseLanguageData, this.SingleData.course_language).subscribe((lang)=>
        {
          this.SingleData.course_language=lang.language_name
        })
        this.http.get(Domain.GetCourseType,this.SingleData.course_type).subscribe((type) => {
          this.SingleData.course_type=type.course_type_name
        })
        this.ShowMoreItem=""
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
  OpenShowMore(id: string) {
    if (this.ShowMoreItem == id) {
      this.ShowMoreItem = ""
    }
    else {
      this.ShowMoreItem = id;
    }
  }
  GetCourseTypeData() {
    this.http.getAll(`${Domain.GetCourseType}`).subscribe((response) => {
      this.CourseTypeData = response
    })
  }
}

