import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IDiscountAll, IDiscountSingle } from 'src/app/interfaces/IDiscount';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { MinioService } from '../services/minio.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: IDiscountAll[] = []
  SingleData: IDiscountSingle
  form_title = "اطلاعات پایه / نقش ها"
  table_header: string[] = ["نام پوشه", "تاریخ ایجاد ", "تعداد فایل ها", "حجم کل"]
  field_count: string = "discount_code"
  get_all_route: string = Domain.GetDiscount
  delete_route: string = Domain.DeleteDiscount
  add_url: string = "/basic/discount/add"
  edit_url: string = "/basic/discount/edit"
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
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    //this.GetResponseData(1, 10, this.order)
    //this.GetResponseDataLenght()
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

  OpenModal() {
    this.IsShowenModal = !this.IsShowenModal
  }

  changePage(event :number){
    this.currentPage=event
    this.GetResponseData(this.currentPage,10,this.order)
    }
}

