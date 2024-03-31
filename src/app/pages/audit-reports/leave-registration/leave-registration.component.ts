import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ILeaveRequest } from 'src/app/interfaces/ILeaveRequest';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-registration',
  templateUrl: './leave-registration.component.html',
  styleUrl: './leave-registration.component.css'
})
export class LeaveRegistrationComponent implements OnInit {

  ResponseDataList: ILeaveRequest[] = []
  ResponseDataLenght: number[];
  SearchValue: string
   mydate = new Date(2024,2,21);
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  order:string="desc"
  SingleData:ILeaveRequestForm
  IsShowenModal: boolean = false
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?table=Leave Forms`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number,order:string) {
    this.isLoading=true
    this.http.getAll(`${Domain.GetLeaveRegistration}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList=response;
      this.isLoading=false;
    })
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  ChangeSort(value:any)
  {
    this.order=value.target.value
    this.GetResponseData(1,10,this.order);
  }
  RemoveItem(id?: number) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
        .deleteWithQuery(`${Domain.DeleteLeaveRegistration}?form_id=${id}`)
          .subscribe((response) => {
            console.log(response);
          });
        this.GetResponseData(1,10,this.order);
        this.alertServices.success('آیتم با موفقیت حذف شد');
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
      .get(Domain.GetLeaveRegistration, id)
      .subscribe((response) => {
        this.SingleData = response;
        console.log(response)
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
