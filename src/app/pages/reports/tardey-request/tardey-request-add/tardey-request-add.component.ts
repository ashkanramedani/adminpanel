import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ISalaryPolicyForms } from 'src/app/interfaces/ISalaryPolicyForms';
import { ITardeyRequestForm } from 'src/app/interfaces/ITardeyRequestForm';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';

@Component({
  selector: 'app-tardey-request-add', 
  templateUrl: './tardey-request-add.component.html',
})
export class TardeyRequestAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/tardy_request'
  form_title:string="  تاخیر اساتید"
  AuditForm: ITardeyRequestForm
  get_Singel_route: string = Domain.GetTardeyRequest
  put_route: string = Domain.PutTardeyRequest
  create_route: string = Domain.CreateTardeyRequest
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
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        course_fk_id: new FormControl('', [Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        delay: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
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
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status);
    this.ReportForm.controls["course_fk_id"].patchValue(this.AuditForm.course_fk_id);
    this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    this.ReportForm.controls["delay"].patchValue(this.AuditForm.delay)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ITardeyRequestForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      course_fk_id: this.ReportForm.controls.course_fk_id.value,
      teacher_fk_id: this.ReportForm.controls.teacher_fk_id.value,
      delay: this.ReportForm.controls.delay.value,
      teacher_tardy_reports_pk_id:this.id

    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
        this.btnLoading = false
      }
      )
    }
  }

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }
  GetClassData() {
    this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }

}

