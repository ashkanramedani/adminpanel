import { Component, inject, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IRewardCardAll, IRewardCardSingle } from 'src/app/interfaces/IRewardCard';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
})
export class RewardCardComponent implements OnInit {


  //#region change this informaion
  ResponseDataList: IRewardCardAll[] = []
  SingleData: IRewardCardSingle
  form_title = "اطلاعات پایه / کارت پاداش اساتید"
  table_header: string[] = ["ردیف", "پرسنل", "میزان پاداش", "نوع پاداش","وضعیت", "عملیات"]
  field_count:string="reward_card"
  get_all_route:string=Domain.GetRewardCardData
  delete_route:string=Domain.DeleteRewardCardData
  add_url:string="/basic/reward-card/add"
  edit_url:string="/basic/reward-card/edit"
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
  private readonly http=inject(HttpService)
  private readonly alertServices=inject(AlertifyService)
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
  changePage(event :number){
    this.currentPage=event
    this.GetResponseData(this.currentPage,10,this.order)
    }
}

