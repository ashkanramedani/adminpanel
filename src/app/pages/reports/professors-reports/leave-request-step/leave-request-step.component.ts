import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { ILeaveRequestSingle } from 'src/app/interfaces/ILeaveRequest';
import { ILeaveRequestUpdate } from 'src/app/interfaces/ILeaveRequestForm';
import { ILeaveRequestReport } from 'src/app/interfaces/ILeaveRequestReport';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-request-step',
  templateUrl: './leave-request-step.component.html',
})
export class LeaveRequestStepComponent implements OnInit {
  isOpenleaveRequestEdit: boolean = false
  LeaveRequestResponse: ILeaveRequestSingle
  LeaveRequestForm: FormGroup
  table_header: string[] = []
  response_leave_request_report : ILeaveRequestReport[]=[]
  @Input() id: any
  @Input() year: number
  @Input() month: number

  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.LeaveRequestForm = this.formBuilder.group(
      {
        leave_type: new FormControl('', [Validators.required]),
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      })
    this.table_header = ["ردیف", " تاریخ مرخصی", " ثبت مرخصی ساعتی ", " ثبت مرخصی روزانه  ", "نوع", " وضعیت", ""]
    this.GetLeaveRequestReport()
  }
  GetLeaveRequestReport() {
    this.http.getAll(`${Domain.GetLeaveRequestReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_leave_request_report = response.Vacation.concat(response.Medical)
      console.log("leave request response: ", this.response_leave_request_report)
    })
  }
  OpenleaveRequestEdit(id: string) {
    this.http
      .get(Domain.GetLeaveRequest, id)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.isOpenleaveRequestEdit = true
          this.LeaveRequestResponse = response;
          this.LeaveRequestForm.controls["date"].patchValue(moment(this.LeaveRequestResponse.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
          this.LeaveRequestForm.controls["start"].patchValue(this.LeaveRequestResponse.start);
          this.LeaveRequestForm.controls["end"].patchValue(this.LeaveRequestResponse.end);
          this.LeaveRequestForm.controls["leave_type"].patchValue(this.LeaveRequestResponse.leave_type);
        },
        error: (error) => {
        }
      })
  }
  onSubmitLeaveRequest() {
    if (this.LeaveRequestForm.invalid) {
      this.LeaveRequestForm.markAllAsTouched();
      return;
    }
    if (this.LeaveRequestResponse != null) {
      let leaveRequestForm: ILeaveRequestUpdate =
      {
        created_fk_by: this.LeaveRequestResponse.created_fk_by,
        description: this.LeaveRequestResponse.description,
        leave_type: this.LeaveRequestForm.controls.leave_type.value,
        leave_request_pk_id: this.LeaveRequestResponse.leave_request_pk_id,
        start: this.LeaveRequestForm.controls.start.value,
        end: this.LeaveRequestForm.controls.end.value,
        date: this.LeaveRequestForm.controls.date.value
      }
      this.http.put(Domain.PutLeaveRequest, leaveRequestForm, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.isOpenleaveRequestEdit = false
        this.GetLeaveRequestReport()
      }
      )
    }
    else {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
    }
  }
  CLoseleaveRequestEdit() {
    this.isOpenleaveRequestEdit = false
  }
  ChangeStatusLeaveRequest(id: string) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data = { leave_request_id: ids }
    this.http.put(Domain.PutLeaveRequestVerify, data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }
  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeleteLeaveRequest}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetLeaveRequestReport()
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
}
