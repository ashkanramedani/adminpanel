import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ILeaveRequest } from 'src/app/interfaces/ILeaveRequest';
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
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?table=Leave Forms`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number) {
    this.isLoading=true
    this.http.getAll(`${Domain.GetLeaveRegistration}?page=${page}&limit=${limit}&order=desc`).subscribe((response) => {
      this.ResponseDataList=response;
      this.isLoading=false;
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
        .deleteWithQuery(`${Domain.DeleteLeaveRegistration}?form_id=${id}`)
          .subscribe((response) => {
            console.log(response);
          });
        this.GetResponseData(1,10);
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => { }
    );
  }
}
