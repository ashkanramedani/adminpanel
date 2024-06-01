import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ITardeyRequestForm } from 'src/app/interfaces/ITardeyRequestForm';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ITeacherReplacement } from 'src/app/interfaces/TeacherReplacement';
import { ITeacherReplacementForm } from 'src/app/interfaces/ITeacherReplacementForm';

@Component({
  selector: 'app-teacher-replacement-add',
  templateUrl: './teacher-replacement-add.component.html'
})
export class TeacherReplacementAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/teacher_replacement'
  form_title:string="   استاد جایگزین"
  AuditForm: ITeacherReplacementForm
  get_Singel_route: string = Domain.GetTeacherReplacement
  put_route: string = Domain.PutTeacherReplacement
  create_route: string = Domain.CreateTeacherReplacement
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
    this.GetClassData()
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status:new FormControl(Boolean,[Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        replacement_teacher_fk_id:  new FormControl('', [Validators.required]),
        course_fk_id:new FormControl('', [Validators.required]),
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
    this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    this.ReportForm.controls["replacement_teacher_fk_id"].patchValue(this.AuditForm.replacement_teacher_fk_id);
    this.ReportForm.controls["course_fk_id"].patchValue(this.AuditForm.course_fk_id)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ITeacherReplacementForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status:this.ReportForm.controls.status.value,
      teacher_fk_id:this.ReportForm.controls.teacher_fk_id.value,
      replacement_teacher_fk_id: this.ReportForm.controls.replacement_teacher_fk_id.value,
      course_fk_id:this.ReportForm.controls.course_fk_id.value,
      teacher_replacement_pk_id:this.id

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

