import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IRemoteRequest } from 'src/app/interfaces/IRemoteRequest';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-remote-work-registration',
  templateUrl: './remote-work-registration.component.html',
  styleUrl: './remote-work-registration.component.css'
})
export class RemoteWorkRegistrationComponent implements OnInit {

  ResponseDataList: IRemoteRequest[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  currentPage:number=1
  IsShowenModal: boolean = false
  SingleData:IRemoteRequest
  order:string="desc"
  isLoading: boolean = true
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?field=Remote Request`).subscribe((response)=>
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
    this.http.getAll(`${Domain.GetRemoteWorkRegistration}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      console.log(response)
      this.ResponseDataList=response;
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
        .deleteWithQuery(`${Domain.DeleteRemoteWorkRegistration}?form_id=${id}`)
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
      .get(Domain.GetSingleRemoteWork, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.created_fk_by).subscribe((emp)=>
        {
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

