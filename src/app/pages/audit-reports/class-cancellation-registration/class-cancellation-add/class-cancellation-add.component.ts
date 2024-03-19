import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IClassCancellationForm } from 'src/app/interfaces/IClassCancellationForm';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-class-cancellation-add',
  templateUrl: './class-cancellation-add.component.html',
  styleUrl: './class-cancellation-add.component.css'
})
export class ClassCancellationAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  ClassData:IClassDetails[]=[]
  id: any;
  btnLoading:boolean=false
  page_title:string="افزودن"
  AuditForm:IClassCancellationForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetClassData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        class_fk_id: new FormControl('', [Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        replacement_date: new FormControl('', [Validators.required]),
        class_duration: new FormControl('', [Validators.required]),
        class_location: new FormControl('', [Validators.required]),

      }
    )
    if (this.id !=null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    this.http
      .get(Domain.GetSingleClassCancellation, this.id)
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
    this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    this.ReportForm.controls["replacement_date"].patchValue(formatDate(this.AuditForm.replacement_date,"YYYY/MM/dd   HH:mm",'en-IR'));
    this.ReportForm.controls["class_fk_id"].patchValue(this.AuditForm.class_fk_id)
    this.ReportForm.controls["class_duration"].patchValue(this.AuditForm.class_duration)
    this.ReportForm.controls["class_location"].patchValue(this.AuditForm.class_location)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IClassCancellationForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      class_fk_id: this.ReportForm.controls.class_fk_id.value,
      teacher_fk_id: this.ReportForm.controls.teacher_fk_id.value,
      replacement_date: this.ReportForm.controls.replacement_date.value,
      class_duration: this.ReportForm.controls.class_duration.value,
      class_location: this.ReportForm.controls.class_location.value,
      class_cancellation_pk_id:this.id
    }
    if (this.id !=null) {
      this.btnLoading=true
      this.http.put(Domain.PutClassCancellation,ReportFormValue,null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading=false
      }
      )
    }
    else {
      this.btnLoading=true
      this.http.create(Domain.CreateClassCancellation, ReportFormValue, null).subscribe((response) => {
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
  GetClassData()
  {
 this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
}
