
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISessionAll, ISessionSingle } from 'src/app/interfaces/ISession';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
})
export class SessionsComponent implements OnInit {


  //#region change this informaion
  ResponseDataList: ISessionAll[] = []
  SingleData: ISessionSingle
  form_title = "اطلاعات پایه /  جلسات کلاس"
  table_header: string[] = ["ردیف", "نام دوره", "نام درس", "استاد","وضعیت","عملیات"]
  field_count:string="Session"
  get_all_route:string=Domain.GetSession
  delete_route:string=Domain.DeleteSession
  add_url:string="/basic/session/add"
  edit_url:string="/basic/session/edit"
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
        this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp) => {
          this.SingleData.created_fk_by = emp.name + " " + emp.last_name
        })
        this.http.get(Domain.GetcourseData, this.SingleData.course_fk_id).subscribe((x) => {
          this.SingleData.course_fk_id = x.course_name
        })
        this.http.get(Domain.GetUsers, this.SingleData.session_teacher_fk_id).subscribe((x) => {
          this.SingleData.session_teacher_fk_id = x.name + " " + x.last_name
        })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}
