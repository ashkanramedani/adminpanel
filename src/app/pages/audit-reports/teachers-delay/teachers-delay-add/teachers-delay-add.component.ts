import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { ITeacherDelayForm } from 'src/app/interfaces/ITeacherDelayForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teachers-delay-add',
  templateUrl: './teachers-delay-add.component.html',
  styleUrl: './teachers-delay-add.component.css'
})
export class TeachersDelayAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  ClassData: IClassDetails[] = []
  page_title: string = 'افزودن';
  id: any ;
  AuditForm:ITeacherDelayForm
  btnLoading:boolean=false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id =this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetClassData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        class_fk_id: new FormControl('', [Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        delay: new FormControl('', [Validators.required]),
      }
    )
    if (this.id!=null ) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetSingleTeacherDelay, this.id)
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
    this.ReportForm.controls["class_fk_id"].patchValue(this.AuditForm.class_fk_id);
    this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    this.ReportForm.controls["delay"].patchValue(this.AuditForm.delay)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ITeacherDelayForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      class_fk_id: this.ReportForm.controls.class_fk_id.value,
      teacher_fk_id: this.ReportForm.controls.teacher_fk_id.value,
      delay: this.ReportForm.controls.delay.value,
      teacher_tardy_reports_pk_id:this.id
    }
    if (this.id!=null) {
      this.btnLoading=true
      this.http.put(Domain.PutTeacherDelay,ReportFormValue,null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading=false
      }
      )
    }
    else {
      this.btnLoading=true
      this.http.create(Domain.CreateTeachersDelay, ReportFormValue, null).subscribe((response) => {
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
  GetClassData() {
    this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
}
