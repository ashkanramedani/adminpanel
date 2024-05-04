
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IEmployeesForm } from 'src/app/interfaces/IEmployeesForm';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import { IRoles } from 'src/app/interfaces/IRoles';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrl: './employees-add.component.css'
})
export class EmployeesAddComponent implements OnInit {
  ReportForm: FormGroup;
  RolesData: IRoles[] = []
  id: any;
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: IEmployeesForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        last_name: new FormControl('',[Validators.required]),
        day_of_birth: new FormControl(''),
        email: new FormControl('',),
        mobile_number: new FormControl('', [Validators.required]),
        address: new FormControl(''),
        priority: new FormControl('', [Validators.required]),
        fingerprint_scanner_user_id: new FormControl('', [Validators.required]),
        roles: new FormControl('', )
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetAuditEmplooyies, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["name"].patchValue(this.AuditForm.name);
    this.ReportForm.controls["last_name"].patchValue(this.AuditForm.last_name);
    this.ReportForm.controls["day_of_birth"].patchValue( moment(this.AuditForm.day_of_birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["email"].patchValue(this.AuditForm.email);
    this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    this.ReportForm.controls["address"].patchValue(this.AuditForm.address)
    this.ReportForm.controls["priority"].patchValue(this.AuditForm.priority)
    this.ReportForm.controls["fingerprint_scanner_user_id"].patchValue(this.AuditForm.fingerprint_scanner_user_id)
    this.ReportForm.controls["roles"].patchValue(this.AuditForm.roles[0])
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IEmployeesForm =
    {
      employees_pk_id:this.id,
      name: this.ReportForm.controls.name.value,
      last_name: this.ReportForm.controls.last_name.value,
      //day_of_birth:  ( this.ReportForm.controls.day_of_birth.value),
      day_of_birth:moment.from(this.ReportForm.controls.day_of_birth.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),
      email: this.ReportForm.controls.email.value,
      mobile_number: this.ReportForm.controls.mobile_number.value,
      address: this.ReportForm.controls.address.value,
      priority: this.ReportForm.controls.priority.value,
      fingerprint_scanner_user_id: this.ReportForm.controls.fingerprint_scanner_user_id.value,
      //roles:new Array( this.ReportForm.controls.roles.value),
      roles: this.ReportForm.controls.roles.value=='' ? new Array( ) : new Array( this.ReportForm.controls.roles.value) ,


    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(Domain.PutAuditEmplooyies, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreateAuditEmplooyies, ReportFormValue, null).subscribe((response) => {
        console.log(response)
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading = false
      }
      )
    }
  }
  GetRolesData() {
    this.http.getAll(Domain.GetRolesData).subscribe((response) => {
      this.RolesData = response;
    })
  }
}
