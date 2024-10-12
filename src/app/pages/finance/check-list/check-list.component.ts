
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IDiscountAll, IDiscountSingle } from 'src/app/interfaces/IDiscount';
import { IRoles } from 'src/app/interfaces/IRoles';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
})
export class CheckListComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: IDiscountAll[] = []
  SingleData: IDiscountSingle
  form_title = "اطلاعات پایه / نقش ها"
  table_header: string[] = ["ردیف", "صاحب چک", "تاریخ سررسید","مبلغ چک","شماره / سریال چک ","شماره تماس",]
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
  isLoading: boolean = false
  order: string = "desc"
  IsShowenModal: boolean = false
  page: number = 1
  limit: number = 10
  currentPage: number = 1
  isOpenCheckEdit:boolean=false
  isOpenCheckImage:boolean=false
  isOpenCheckInfo:boolean=false

  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
   // this.GetResponseData(1, 10, this.order)
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
  CLoseCheckInfo(){
    this.isOpenCheckInfo=!this.isOpenCheckInfo
  }
  CLoseCheckEdit(){
    this.isOpenCheckEdit=!this.isOpenCheckEdit
  }
  CLoseCheckImage(){
    this.isOpenCheckImage=!this.isOpenCheckImage
  }
}
