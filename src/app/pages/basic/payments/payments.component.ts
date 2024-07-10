import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { IUsersForm } from 'src/app/interfaces/IUsersForm';
import { Ipayment_method } from 'src/app/interfaces/Ipayment_method';
import { Ipayment_methodForm } from 'src/app/interfaces/Ipayment_methodForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {


  //#region change this informaion
  ResponseDataList: Ipayment_method[] = []
  SingleData: Ipayment_method
  form_title = "اطلاعات پایه / روش های پرداخت"
  table_header: string[] = ["ردیف", "نام", "شماره کارت",'شماره شبا',"وضعیت", "عملیات"]
  field_count:string="Payment_Method"
  get_all_route:string=Domain.GetPaymentMethodData
  delete_route:string=Domain.DeletePaymentMethodData
  add_url:string="/basic/payment/add"
  edit_url:string="/basic/payment/edit"
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
      .get(this.get_all_route, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp)=>
          {
            console.log("emp: "+emp)
            this.SingleData.created_fk_by=emp.name + " "+emp.last_name
          })
          this.http.get(Domain.GetUsers, this.SingleData.user_fk_id).subscribe((emp)=>
            {
              console.log("emp: "+emp)
              this.SingleData.user_fk_id=emp.name + " "+emp.last_name
            })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
    CopyValue(val: any){
      let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.alertServices.success("اطلاعات در حافظه کپی شد")
      }
}
