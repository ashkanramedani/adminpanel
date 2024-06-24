import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-leave-form-add',
  templateUrl: './leave-form-add.component.html',
})
export class LeaveFormAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/leave_request'
  form_title:string=" مرخصی"
  AuditForm: ILeaveRequestForm
  get_Singel_route: string = Domain.GetLeaveRequest
  put_route: string = Domain.PutLeaveRequest
  create_route: string = Domain.CreateLeaveRequest
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab:number=1
  OpenTab(value:number){
    this.isOpenTab=value
    //this.setValidation(value)
  }
  ReportForm: FormGroup;
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
        status: new FormControl('', [Validators.required])
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
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["user_fk_id"].patchValue(this.AuditForm.user_fk_id);
    this.ReportForm.controls["start_date"].patchValue( moment(this.AuditForm.start_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["end_date"].patchValue( moment(this.AuditForm.end_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ILeaveRequestForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      user_fk_id: this.ReportForm.controls.user_fk_id.value,
      end_date:moment.from(this.ReportForm.controls.end_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      start_date:moment.from(this.ReportForm.controls.start_date.value, 'fa', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      status:this.ReportForm.controls.status.value,
      leave_request_pk_id:this.id

    }
    if (this.id != null) {
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
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

