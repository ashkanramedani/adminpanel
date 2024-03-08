import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IMissionRegisteration } from 'src/app/interfaces/IMissionRegisteration';
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
  selected_response_ids: number[] = [];
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData()
  }
  GetResponseData() {
    this.isLoading=true
    this.http.getAll(Domain.GetMissionRegistration).subscribe((response) => {
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
          });
        this.alertServices.success('آیتم با موفقیت حذف شد');
        this.GetResponseData();
      },
      () => { }
    );
  }
}

