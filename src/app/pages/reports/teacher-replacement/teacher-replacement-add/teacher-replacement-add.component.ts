import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ITeacherReplacementForm } from 'src/app/interfaces/ITeacherReplacementForm';
import { ISessionAll } from 'src/app/interfaces/ISession';

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
  SesssionData: ISessionAll[] = []
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
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        main_teacher_fk_id: new FormControl('', [Validators.required]),
        sub_teacher_fk_id:  new FormControl('', [Validators.required]),
        session_fk_id:new FormControl('', ),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
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
    this.ReportForm.controls["main_teacher_fk_id"].patchValue(this.AuditForm.main_teacher_fk_id);
    this.ReportForm.controls["sub_teacher_fk_id"].patchValue(this.AuditForm.sub_teacher_fk_id);
    this.ReportForm.controls["session_fk_id"].patchValue(this.AuditForm.session_fk_id)
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
      main_teacher_fk_id:this.ReportForm.controls.main_teacher_fk_id.value,
      sub_teacher_fk_id: this.ReportForm.controls.sub_teacher_fk_id.value,
      session_fk_id:this.ReportForm.controls.session_fk_id.value,
      sub_request_pk_id:this.id

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


  GetClassData() {
    this.http.getAll(Domain.GetSession).subscribe((response) => {
      this.SesssionData = response;
      console.log(response)
    })
  }

}

