import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IRemoteRequestForm } from 'src/app/interfaces/IRemoteRequestForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-remote-work-registration-add',
  templateUrl: './remote-work-registration-add.component.html',
  styleUrl: './remote-work-registration-add.component.css'
})
export class RemoteWorkRegistrationAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  page_title:string="افزودن"
  btnLoading:boolean=false
  id: any;
  AuditForm:IRemoteRequestForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        employee_fk_id: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        working_location:new FormControl('',[Validators.required]),
        status:new FormControl('',[Validators.required])
      }
    )
    if (this.id !=null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  get_single_Data() {
    this.http
      .get(Domain.GetSingleRemoteWork, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()

      });
  }
  FillFormData()
  {
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["employee_fk_id"].patchValue(this.AuditForm.employee_fk_id);
    this.ReportForm.controls["start_date"].patchValue(formatDate(this.AuditForm.start_date,"YYYY/MM/dd   HH:mm",'en-IR'));
    this.ReportForm.controls["end_date"].patchValue(formatDate(this.AuditForm.end_date,"YYYY/MM/dd   HH:mm",'en-IR') );
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status)
    this.ReportForm.controls["working_location"].patchValue(this.AuditForm.working_location)
  }

  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IRemoteRequestForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      employee_fk_id: this.ReportForm.controls.employee_fk_id.value,

      end_date:moment.from(this.ReportForm.controls.end_date.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),
      start_date:moment.from(this.ReportForm.controls.start_date.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),

      //end_date: this.ReportForm.controls.end_date.value,
      //start_date: this.ReportForm.controls.start_date.value,
      working_location:this.ReportForm.controls.working_location.value,
      status:this.ReportForm.controls.status.value,
      remote_request_pk_id:this.id
    }
    if (this.id !=null) {
      this.btnLoading=true
      this.http.put(Domain.PutRemoteWork,ReportFormValue,null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading=false
      }
      )
    }
    else {
      this.btnLoading=true
      this.http.create(Domain.CreateRemoteWorkRegistration, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        if (response == 'Record has been Added') {
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading=false
        }
      }
      )
    }
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
}
