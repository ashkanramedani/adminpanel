import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IMissionRegisteration } from 'src/app/interfaces/IMissionRegisteration';
import { IMissionRegisterationForm } from 'src/app/interfaces/IMissionRegisterationForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-mission-registration',
  templateUrl: './mission-registration.component.html',
  styleUrl: './mission-registration.component.css'
})
export class MissionRegistrationComponent implements OnInit {

  ResponseDataList: IMissionRegisteration[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  SingleData:IMissionRegisteration
  selected_response_ids: number[] = [];
  order:string="desc"
  IsShowenModal: boolean = false
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?field=Business Trip`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  ChangeSort(value:any)
  {
    this.order=value.target.value
    this.GetResponseData(1,10,this.order);
  }
  GetResponseData(page:number,limit:number,order:string) {
    this.isLoading=true
    this.http.getAll(`${Domain.GetMissionRegistration}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList=response
      console.log(response)
      this.isLoading=false
    })
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  RemoveItem(id?: number) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
        .deleteWithQuery(`${Domain.DeleteMissionRegistration}?form_id=${id}`)
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
  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(Domain.GetSingleMissionRegistration, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.created_fk_by).subscribe((emp)=>
        {
          console.log("emp: "+emp)
          this.SingleData.created_fk_by=emp.name + " "+emp.last_name
        })
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.employee_fk_id).subscribe((teacher)=>
        {
          this.SingleData.employee_fk_id=teacher.name + " "+teacher.last_name
        })
        // this.http.get(Domain.GetAuditClass,this.SingleData.class_fk_id).subscribe((cls) => {
        //   this.SingleData.class_fk_id=cls.name
        // })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}

