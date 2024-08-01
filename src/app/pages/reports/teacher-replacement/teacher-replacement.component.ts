
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISalaryPolicy } from 'src/app/interfaces/ISalaryPolicy'; 
import { ITeacherReplacement } from 'src/app/interfaces/TeacherReplacement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-replacement',
  templateUrl: './teacher-replacement.component.html'
})
export class TeacherReplacementComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: ITeacherReplacement[] = []
  SingleData: ISalaryPolicy
  form_title = "گزارشات /  استاد جایگزین"
  table_header: string[] = ["ردیف", "سازنده", " استاد اصلی ", "استاد جایگزین","کلاس ","وضعیت","عملیات"]
  field_count:string="Sub_Request"
  get_all_route:string=Domain.GetTeacherReplacement
  delete_route:string=Domain.DeleteTeacherReplacement
  add_url:string="/reports/teacher_replacement/add"
  edit_url:string="/reports/teacher_replacement/edit"
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
    this.GetResponseData(1, 10, this.order)
    this.GetResponseDataLenght()

  }

  GetResponseDataLenght() {
    // this.http.getAll(`${Domain.GetCount}?field=${this.field_count}`).subscribe((response) => {
    //   this.totalCount = response
    //   this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    // })
  }
  GetResponseData(page: number, limit: number, order: string) {
 this.isLoading = true;
    this.http.getAll(`${this.get_all_route}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;

      this.isLoading = false
      console.log(response)
    })
  }

  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${this.delete_route}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetResponseData(1, 10, this.order);
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
    this.GetResponseData(1, 10, this.order);
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
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
  changePage(event :number){
    this.currentPage=event
    this.GetResponseData(this.currentPage,10,this.order)
    }
}

