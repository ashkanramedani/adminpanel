import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { IStudentsForm } from 'src/app/interfaces/IStudentsForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit {
  ReportForm: FormGroup;
  RolesData: IRoles[] = []
  id: any;
  EmployiesData: IEmployees[] = []
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: IStudentsForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        last_name: new FormControl('',[Validators.required]),
        day_of_birth: new FormControl(''),
        email: new FormControl(''),
        mobile_number: new FormControl('',[Validators.required]),
        id_card_number: new FormControl(''),
        address: new FormControl(''),
        created_fk_by: new FormControl(''),
        level: new FormControl('')
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
      .get(Domain.GetStudentData, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["name"].patchValue(this.AuditForm.name);
    this.ReportForm.controls["last_name"].patchValue(this.AuditForm.last_name);
    this.ReportForm.controls["last_name"].patchValue(this.AuditForm.last_name);
    this.ReportForm.controls["email"].patchValue(this.AuditForm.email);
    this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    this.ReportForm.controls["id_card_number"].patchValue(this.AuditForm.id_card_number);
    this.ReportForm.controls["address"].patchValue(this.AuditForm.address);
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["level"].patchValue(this.AuditForm.level);
    this.ReportForm.controls["day_of_birth"].patchValue( moment(this.AuditForm.day_of_birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IStudentsForm =
    {
      user_pk_id:this.id,
      name: this.ReportForm.controls.name.value,
      last_name: this.ReportForm.controls.last_name.value,
      //day_of_birth: this.ReportForm.controls.day_of_birth.value,
      day_of_birth:moment.from(this.ReportForm.controls.day_of_birth.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),

      email: this.ReportForm.controls.email.value,
      mobile_number: this.ReportForm.controls.mobile_number.value,
      id_card_number: this.ReportForm.controls.id_card_number.value,
      address: this.ReportForm.controls.address.value,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      level: this.ReportForm.controls.level.value,
    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(Domain.PutStudentData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreateStudentData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading = false
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

