import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-registration',
  templateUrl: './leave-registration.component.html',
  styleUrl: './leave-registration.component.css'
})
export class LeaveRegistrationComponent implements OnInit {

  ResponseDataList: ILeaveRequestForm[] = []
  ResponseDataLenght: number[];
  SearchValue: string
   mydate = new Date(2024,2,21);
  isCheckedStatus: number;
  isLoading: boolean = true
  selected_response_ids: number[] = [];
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData()
  }
  GetResponseData() {
    this.http.getAll(Domain.GetLeaveRegistration).subscribe((response) => {
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
        this.GetResponseData();
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => { }
    );
  }
  checkToDeletedCheckBox(event: any, id: number) {
    if (event?.target.checked) {
      this.selected_response_ids.push(id);
    } else {
      let index = this.selected_response_ids.indexOf(id);
      this.selected_response_ids.splice(index, 1);
    }
  }
}
