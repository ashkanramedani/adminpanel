import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IBusinessTrip } from 'src/app/interfaces/IBusinessTrip';
import { IRemoteRequest } from 'src/app/interfaces/IRemoteRequest';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-remote-request', 
  templateUrl: './remote-request.component.html',
})
export class RemoteRequestComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: IRemoteRequest[] = []
  SingleData: IRemoteRequest
  form_title = "گزارشات حسابرسی /  دورکاری "
  table_header: string[] = ["ردیف", " ایجاد کننده" ,"تاریخ شروع","تاریخ پایان", "پرسنل ","وضعیت","عملیات"]
  field_count:string="Remote Request"
  get_all_route:string=Domain.GetRemoteRequest
  delete_route:string=Domain.DeleteRemoteRequest
  add_url:string="/reports/remote_request/add"
  edit_url:string="/reports/remote_request/edit"
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
    this.currentPage = page;
    this.http.getAll(`${this.get_all_route}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;
      this.currentPage = page
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
}
