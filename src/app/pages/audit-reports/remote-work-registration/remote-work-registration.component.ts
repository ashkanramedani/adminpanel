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
  isLoading: boolean = true
  selected_response_ids: number[] = [];
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData()
  }
  GetResponseData() {
    this.isLoading=true
    this.http.getAll(Domain.GetRemoteWorkRegistration).subscribe((response) => {
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
          });
        this.GetResponseData();
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => { }
    );
  }

}

