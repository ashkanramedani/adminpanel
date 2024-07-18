import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import * as moment from 'jalali-moment';
import { IBusinessTripAdd, IBusinessTripUpdate } from 'src/app/interfaces/IBusinessTripForm';
import { IBusinessTripSingle } from 'src/app/interfaces/IBusinessTrip';

@Component({
  selector: 'app-business-trip-add',
  templateUrl: './business-trip-add.component.html',
})
export class BusinessTripAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/business_trip'
  form_title: string = " ماموریت"
  SingleResponse: IBusinessTripSingle
  get_Singel_route: string = Domain.GetBusinessTrip
  put_route: string = Domain.PutBusinessTrip
  create_route: string = Domain.CreateBusinessTrip
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab: number = 1
  OpenTab(value: number) {
    this.isOpenTab = value
    //this.setValidation(value)
  }
  ReportForm: FormGroup;
  EditForm: FormGroup
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: IClassDetails[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        user_fk_id: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        destination: new FormControl('', [Validators.required]),
      }
    )
    this.EditForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        date: new FormControl('', [Validators.required]),
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        destination: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(`${Domain.GetUsers}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(this.get_Singel_route, this.id)
      .subscribe((response) => {
        console.log(response)
        this.SingleResponse = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.EditForm.controls["created_fk_by"].patchValue(this.SingleResponse.created_fk_by);
    this.EditForm.controls["description"].patchValue(this.SingleResponse.description);
    this.EditForm.controls["date"].patchValue(this.SingleResponse.date);
    this.EditForm.controls["start"].patchValue(this.SingleResponse.start);
    this.EditForm.controls["end"].patchValue(this.SingleResponse.end);
    this.EditForm.controls["destination"].patchValue(this.SingleResponse.destination)
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id != null) {
      if (this.EditForm.invalid) {
        this.EditForm.markAllAsTouched();
        return;
      }
      let EditFormValue: IBusinessTripUpdate =
      {
        created_fk_by: this.EditForm.controls.created_fk_by.value,
        description: this.EditForm.controls.description.value,
        date: moment.from(this.EditForm.controls.date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
        start: this.EditForm.controls.start.value,
        end: this.EditForm.controls.end.value,
        destination: this.EditForm.controls.destination.value,
        business_trip_pk_id: this.id
      }
      this.http.put(this.put_route, EditFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      if (this.ReportForm.invalid) {
        this.ReportForm.markAllAsTouched();
        return;
      }
      let ReportFormValue: IBusinessTripAdd =
      {
        created_fk_by: this.ReportForm.controls.created_fk_by.value,
        description: this.ReportForm.controls.description.value,
        user_fk_id: this.ReportForm.controls.user_fk_id.value,
        end_date: moment.from(this.ReportForm.controls.end_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        start_date: moment.from(this.ReportForm.controls.start_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        destination: this.ReportForm.controls.destination.value, 
        business_trip_pk_id: this.id
      }
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
      }
      )
    }
    this.btnLoading = false
  }



}

