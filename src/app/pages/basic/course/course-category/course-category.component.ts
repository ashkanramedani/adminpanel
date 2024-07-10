import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ICourseCategory } from 'src/app/interfaces/ICourseCategory';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
})
export class CourseCategoryComponent implements OnInit {

  ResponseDataList: ICourseCategory[] = []
  ResponseDataLenght: number[];
  totalCount: number = 0
  SearchValue: string
  edit_url:string='/basic/course-category/edit'
  isCheckedStatus: number;
  isLoading: boolean = true
  order: string = "desc"
  ShowMoreItem: string
  IsShowenModal: boolean = false
  SingleData: ICourseCategory
  EmployiesData: string
  ClassData: IClassDetails
  form_title = "دسته بندی دوره "
  table_header: string[] = ["عنوان", "توضیحات", "وضعیت", "عملیات"]
  // page:number=1
  // limit:number=10
  currentPage: number = 1
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(0, 1000, this.order)
    this.GetResponseDataLenght()

  }
  OpenShowMore(id: string) {
    if (this.ShowMoreItem == id) {
      this.ShowMoreItem = ""
    }
    else {
      this.ShowMoreItem = id;
    }
  }
  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=Tardy Request`).subscribe((response) => {
      this.totalCount = response
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page: number, limit: number, order: string) {
    this.isLoading = true;
    this.currentPage = page;
    this.http.getAll(`${Domain.GetCourseCategoryData}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;
      this.currentPage = page
      this.isLoading = false
      console.log(response)
    })
  }

  RemoveItem(id?: string) {
    this.ShowMoreItem = ""
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeleteCourseCategoryData}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetResponseData(0, 1000, this.order);
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
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
      .get(Domain.GetCourseCategoryData, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp) => {
          console.log("emp: " + emp)
          this.SingleData.created_fk_by = emp.name + " " + emp.last_name
        })
        // this.http.get(Domain.GetAuditEmplooyies, this.SingleData.teacher_fk_id).subscribe((teacher)=>
        // {
        //   this.SingleData.teacher_fk_id=teacher.name + " "+teacher.last_name
        // })
        // this.http.get(Domain.GetAuditClass,this.SingleData.course_fk_id).subscribe((cls) => {
        //   this.SingleData.course_fk_id=cls.name
        // })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}
