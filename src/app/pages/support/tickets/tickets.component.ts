import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit {
  //#region change this informaion
  // ResponseDataList: IBusinessTrip[] = []
  // SingleData: IBusinessTrip
  form_title = "پشتیبانی /    تیکت ها"
  table_header: string[] = ["ردیف", "  تاریخ" , "عنوان ","وضعیت","جزئیات"]
  field_count:string=""
  get_all_route:string=Domain.GetBusinessTrip
  delete_route:string=Domain.DeleteBusinessTrip
  add_url:string="/reports/business_trip/add"
  edit_url:string="/reports/business_trip/edit"
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
    // this.GetResponseData(0, 10, this.order)
    // this.GetResponseDataLenght()

  }

  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=${this.field_count}`).subscribe((response) => {
      this.totalCount = response
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
//   GetResponseData(page: number, limit: number, order: string) {
//  this.isLoading = true;
//     this.http.getAll(`${this.get_all_route}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
//       this.ResponseDataList = response;

//       this.isLoading = false
//       console.log(response)
//     })
//   }

//   RemoveItem(id?: string) {
//     this.alertServices.confirm(
//       'حذف آیتم',
//       'آیا از حذف این آیتم اطمینان دارید؟',
//       () => {
//         this.http
//           .deleteWithQuery(`${this.delete_route}/${id}`)
//           .subscribe((response) => {
//             console.log(response);
//             if (response == "Deleted") {
//               this.GetResponseData(0, 1000, this.order);
//               this.alertServices.success('آیتم با موفقیت حذف شد');
//             }
//             else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
//           });
//       },
//       () => { }
//     );
//   }
//   ChangeSort(value: any) {
//     this.order = value.target.value
//     this.GetResponseData(0, 1000, this.order);
//   }

//   OpenModal(id: string) {
//     if (id == null) {
//       alert("رکورد وجود ندارد")
//       return;
//     }
//     this.http
//       .get(this.get_all_route, id)
//       .subscribe((response) => {
//         this.SingleData = response;
//         this.http.get(Domain.GetUsers, this.SingleData.created_fk_by).subscribe((emp) => {
//           console.log("emp: " + emp)
//           this.SingleData.created_fk_by = emp.name + " " + emp.last_name
//         })
//         this.http.get(Domain.GetUsers, this.SingleData.user_fk_id).subscribe((emp) => {
//           console.log("emp: " + emp)
//           this.SingleData.user_fk_id = emp.name + " " + emp.last_name
//         })
//         this.IsShowenModal = true
//       });
//   }
  CloseModal() {
    this.IsShowenModal = false
  }
}

