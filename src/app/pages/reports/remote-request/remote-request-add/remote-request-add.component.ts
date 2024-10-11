import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import  moment from 'jalali-moment';
import { IRemoteRequestAdd, IRemoteRequestUpdate } from 'src/app/interfaces/IRemoteRequestForm';
import { IRemoteRequestSingle } from 'src/app/interfaces/IRemoteRequest';

@Component({
  selector: 'app-remote-request-add',
  templateUrl: './remote-request-add.component.html'
})
export class RemoteRequestAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/remote_request'
  form_title:string=" دورکاری"
  SingleResponse: IRemoteRequestSingle
  get_Singel_route: string = Domain.GetRemoteRequest
  put_route: string = Domain.PutRemoteRequest
  create_route: string = Domain.CreateRemoteRequest
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab:number=1
  OpenTab(value:number){
    this.isOpenTab=value
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
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

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
        working_location:new FormControl('',[Validators.required]),
      }
    )
    this.EditForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        working_location:new FormControl('',[Validators.required]),
        date:new FormControl('',[Validators.required])
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
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
    this.EditForm.controls["working_location"].patchValue(this.SingleResponse.working_location);
    this.EditForm.controls["date"].patchValue( moment(this.SingleResponse.date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD'));
    this.EditForm.controls["start"].patchValue(this.SingleResponse.start)
    this.EditForm.controls["end"].patchValue(this.SingleResponse.end)
  }
  onSubmit() {
    this.btnLoading = true

    if (this.id != null) {
      if (this.EditForm.invalid) {
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        this.EditForm.markAllAsTouched();
        return;
      }
      let EditFormValue: IRemoteRequestUpdate =
      {
        created_fk_by: this.EditForm.controls.created_fk_by.value,
        description: this.EditForm.controls.description.value,
        working_location:this.EditForm.controls.working_location.value,
        date: moment.from(this.EditForm.controls.date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
        end: this.EditForm.controls.end.value,
        start: this.EditForm.controls.start.value,
        remote_request_pk_id:this.id

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
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        this.ReportForm.markAllAsTouched();
        return;
      }
      let ReportFormValue: IRemoteRequestAdd =
      {
        user_fk_id: this.ReportForm.controls.user_fk_id.value,
        created_fk_by: this.ReportForm.controls.created_fk_by.value,
        description: this.ReportForm.controls.description.value,
        working_location:this.ReportForm.controls.working_location.value,
        end_date: moment.from(this.ReportForm.controls.end_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        start_date: moment.from(this.ReportForm.controls.start_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),

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


