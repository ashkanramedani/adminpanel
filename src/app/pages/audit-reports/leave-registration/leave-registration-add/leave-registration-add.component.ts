import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-registration-add',
  templateUrl: './leave-registration-add.component.html',
  styleUrl: './leave-registration-add.component.css'
})
export class LeaveRegistrationAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  id: any;
  page_title:string="افزودن"
  btnLoading:boolean=false
  AuditForm:ILeaveRequestForm
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
        status: new FormControl('', [Validators.required])
      }
    )
    if (this.id !=null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetSingleLeaveRrgistration, this.id)
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
    this.ReportForm.controls["end_date"].patchValue(formatDate(this.AuditForm.end_date,"YYYY/MM/dd   HH:mm",'en-IR'));
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ILeaveRequestForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      employee_fk_id: this.ReportForm.controls.employee_fk_id.value,
      end_date: this.ReportForm.controls.end_date.value,
      start_date: this.ReportForm.controls.start_date.value,
      status:this.ReportForm.controls.status.value,
      leave_request_pk_id:this.id
      
    }
    if (this.id !=null) {
      this.btnLoading=true
      this.http.put(Domain.PutLeaveRequest,ReportFormValue,null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading=false
      }
      )
    }
    else {
      this.btnLoading=true
      this.http.create(Domain.CreateLeaveRequest, ReportFormValue, null).subscribe((response) => {
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
