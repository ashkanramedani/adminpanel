
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployeeEntryExitForm } from 'src/app/interfaces/IEmployeeEntryExitForm';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employee-entry-exit-add',
  templateUrl: './employee-entry-exit-add.component.html',
  styleUrl: './employee-entry-exit-add.component.css'
})
export class EmployeeEntryExitAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  ClassData:IClassDetails[]=[]
  id: any;
  btnLoading:boolean=false
  page_title:string="افزودن"
  AuditForm:IEmployeeEntryExitForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        EnNo: new FormControl('', [Validators.required]),
        Name: new FormControl('', [Validators.required]),
        Date: new FormControl('', [Validators.required]),
        Enter: new FormControl('', [Validators.required]),
        Exit: new FormControl('', [Validators.required]),
      }
    )
    if (this.id !=null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    this.http
      .get(Domain.GetEmployeeEntryExit, this.id)
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
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status);
    this.ReportForm.controls["EnNo"].patchValue(this.AuditForm.EnNo);
    this.ReportForm.controls["Name"].patchValue(this.AuditForm.Name);
    this.ReportForm.controls["Date"].patchValue( moment(this.AuditForm.Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["Enter"].patchValue( this.AuditForm.Enter);
    this.ReportForm.controls["Exit"].patchValue(this.AuditForm.Exit);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IEmployeeEntryExitForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      EnNo: this.ReportForm.controls.EnNo.value,
      Name: this.ReportForm.controls.Name.value,
      Date:moment.from(this.ReportForm.controls.Date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      Enter:this.ReportForm.controls.Enter.value,
      Exit:this.ReportForm.controls.Exit.value,
      fingerprint_scanner_pk_id:this.id
    }
    if (this.id !=null) {
      this.btnLoading=true
      this.http.put(Domain.PutEmployeeEntryExit,ReportFormValue,null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading=false
      }
      )
    }
    else {
      this.btnLoading=true
      this.http.create(Domain.CreateEmployeeEntryExit, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        if (response == 'Record has been Added') {
          this.alertServices.success("با موفقیت اضافه شد" );
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
