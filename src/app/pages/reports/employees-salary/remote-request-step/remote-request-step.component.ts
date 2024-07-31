import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IRemoteRequestReport, IRemoteRequestSingle } from 'src/app/interfaces/IRemoteRequest';
import { IRemoteRequestUpdate } from 'src/app/interfaces/IRemoteRequestForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-remote-request-step',
  templateUrl: './remote-request-step.component.html',
})
export class RemoteRequestStepComponent implements OnInit {
  @Input() id: any
  @Input() year: number
  @Input() month: number
  table_header: string[] = []
  response_remote_request_report: IRemoteRequestReport[] = []
  isOpenRemoteRequestEdit: boolean = false
  RemoteRequestResponse: IRemoteRequestSingle
  RemoteRequestForm: FormGroup
  have_Permission:boolean=false
  math = Math;
  isLoading:boolean=false
  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.table_header = ["ردیف", " تاریخ  ", "شروع",  " پایان  ", "زمان (دقیقه)", " وضعیت",""]
    this.GetPermision()
    this.RemoteRequestForm = this.formBuilder.group({
      working_location: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    })
    this.GetRemoteRequestReport()
  }
  GetPermision(){
    this.http.get(Domain.GetSalaryPermision,this.id).subscribe((response)=>
      {
        if(response.remote_permission)
          this.have_Permission=true
      })
  }

  GetRemoteRequestReport() {
    this.isLoading=true
    this.http.getAll(`${Domain.GetRemoteRequestReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_remote_request_report = response
      console.log("business trip response: ", response)
      this.isLoading=false
    })
  }
  ChangeStatusRemoteRequest(id: string) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data = { remote_request_id: ids }
    this.http.put(Domain.PutRemoteRequestVerify, data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }

  OpenRemoteRequestEdit(id: string) {
    this.http
      .get(Domain.GetRemoteRequest, id)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.isOpenRemoteRequestEdit = true
          this.RemoteRequestResponse = response;
          this.RemoteRequestForm.controls["date"].patchValue(moment(this.RemoteRequestResponse.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
          this.RemoteRequestForm.controls["start"].patchValue(this.RemoteRequestResponse.start);
          this.RemoteRequestForm.controls["end"].patchValue(this.RemoteRequestResponse.end);
          this.RemoteRequestForm.controls["working_location"].patchValue(this.RemoteRequestResponse.working_location);
        },
        error: (error) => {
        }
      })
  }
  onSubmitBusinessTrip() {
    if (this.RemoteRequestForm.invalid) {
      this.RemoteRequestForm.markAllAsTouched();
      return;
    }
    if (this.RemoteRequestResponse != null) {
      let RemoteRequestForm: IRemoteRequestUpdate =
      {
        created_fk_by: this.RemoteRequestResponse.created_fk_by,
        description: this.RemoteRequestResponse.description,
        remote_request_pk_id: this.RemoteRequestResponse.remote_request_pk_id,
        working_location: this.RemoteRequestForm.controls.working_location.value,
        start: this.RemoteRequestForm.controls.start.value,
        end: this.RemoteRequestForm.controls.end.value,
        date: this.RemoteRequestForm.controls.date.value,
      }
      this.http.put(Domain.PutRemoteRequest, RemoteRequestForm, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.isOpenRemoteRequestEdit = false
        this.GetRemoteRequestReport()
      }
      )
    }
    else {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
    }
  }
  CLoseRemoteRequestEdit() {
    this.isOpenRemoteRequestEdit = false
  }
  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeleteRemoteRequest}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetRemoteRequestReport()
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
}
