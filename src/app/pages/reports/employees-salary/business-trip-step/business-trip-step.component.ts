import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import  moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IBusinessTripReport, IBusinessTripSingle } from 'src/app/interfaces/IBusinessTrip';
import { IBusinessTripUpdate } from 'src/app/interfaces/IBusinessTripForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-business-trip-step',
  templateUrl: './business-trip-step.component.html',
})
export class BusinessTripStepComponent implements OnInit {
  @Input() id: any
  @Input() year: number
  @Input() month: number
  response_business_trip_report: IBusinessTripReport[] = []
  table_header: string[] = []
  isOpenBusinessTripEdit: boolean = false
  BusinessTripResponse: IBusinessTripSingle
  BusinessTripForm: FormGroup
  have_Permission:boolean=false
  math = Math;
  isloading:boolean=false
  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.table_header = ["ردیف", " تاریخ ", "شروع", "پایان", "محل ماموریت", "زمان (دقیقه)" ," وضعیت", ""]
    this.GetBusinessReport()
    this.GetPermision()
    this.BusinessTripForm = this.formBuilder.group({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      destination:new FormControl('', [Validators.required])
    })

  }
  GetPermision(){
    this.http.get(Domain.GetSalaryPermision,this.id).subscribe((response)=>
      {
        if(response.business_trip_permission)
          this.have_Permission=true
      })
  }
  GetBusinessReport() {
    this.isloading=true
    this.http.getAll(`${Domain.GetBusinessReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_business_trip_report = response
      console.log("business trip response: ", response)
      this.isloading=false
    })
  }

  ChangeStatusBusinessTrip(id: string) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data = { business_trip_id: ids }
    this.http.put(Domain.PutBusinessTripVerify, data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }
  OpenBusinessTripEdit(id: string) {
    this.http
      .get(Domain.GetBusinessTrip, id)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.isOpenBusinessTripEdit = true
          this.BusinessTripResponse = response;
          this.BusinessTripForm.controls["date"].patchValue(moment(this.BusinessTripResponse.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
          this.BusinessTripForm.controls["start"].patchValue(this.BusinessTripResponse.start);
          this.BusinessTripForm.controls["end"].patchValue(this.BusinessTripResponse.end);
          this.BusinessTripForm.controls["destination"].patchValue(this.BusinessTripResponse.destination);
        },
        error: (error) => {
        }
      })
  }
  onSubmitBusinessTrip() {
    if (this.BusinessTripForm.invalid) {
      this.BusinessTripForm.markAllAsTouched();
      return;
    }
    if (this.BusinessTripResponse != null) {
      let BusinessTripForm: IBusinessTripUpdate =
      {
        created_fk_by: this.BusinessTripResponse.created_fk_by,
        description: this.BusinessTripResponse.description,
        business_trip_pk_id: this.BusinessTripResponse.business_trip_pk_id,
        destination: this.BusinessTripForm.controls.destination.value,
        start: this.BusinessTripForm.controls.start.value,
        end: this.BusinessTripForm.controls.end.value,
        date: this.BusinessTripForm.controls.date.value,
      }
      this.http.put(Domain.PutBusinessTrip, BusinessTripForm, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.isOpenBusinessTripEdit = false
        this.GetBusinessReport()
      }
      )
    }
    else {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
    }
  }
  CLoseBusinessTripEdit() {
    this.isOpenBusinessTripEdit = false
  }
  RemoveItem(id?: string) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
          .deleteWithQuery(`${Domain.DeleteBusinessTrip}/${id}`)
          .subscribe((response) => {
            console.log(response);
            if (response == "Deleted") {
              this.GetBusinessReport()
              this.alertServices.success('آیتم با موفقیت حذف شد');
            }
            else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
          });
      },
      () => { }
    );
  }
}
