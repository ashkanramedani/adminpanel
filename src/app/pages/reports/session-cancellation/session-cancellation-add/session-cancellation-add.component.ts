import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ICourseAll } from 'src/app/interfaces/ICourse';
import { ISubCourseAll } from 'src/app/interfaces/ISubCourse';
import { ISession, ISessionAll } from 'src/app/interfaces/ISession';
import { ISessionCancellationAdd, ISessionCancellationSingle } from 'src/app/interfaces/ISessionCancellation';

@Component({
  selector: 'app-session-cancellation-add',
  templateUrl: './session-cancellation-add.component.html',
})
export class SessionCancellationAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/session_cancellation'
  form_title: string = "   کنسلی جلسه"
  AuditForm: ISessionCancellationSingle
  get_Singel_route: string = Domain.GetSessionCancellation
  put_route: string = Domain.PutSessionCancellation
  create_route: string = Domain.CreateSessionCancellation
  Creators: IUsers[] = []
  session_data: ISessionAll[] = []
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab: number = 1
  OpenTab(value: number) {
    this.isOpenTab = value
  }
  ReportFormAdd: FormGroup;
  ReportFormUpdate: FormGroup
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: ICourseAll[] = []
  sub_course_data: ISubCourseAll[] = []
  session_sub_course_data: ISession[] = []
  id: any;
  btnLoading: boolean = false
  isLoading: boolean = false

  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.GetEmployeeData()
    this.ReportFormAdd = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        session_fk_id: new FormControl('', [Validators.required]),
        sub_course_teacher :new FormControl(''),
      }
    )
    // this.ReportFormUpdate = this.formBuilder.group(
    //   {
    //     created_fk_by: new FormControl('', [Validators.required]),
    //     description: new FormControl(''),
    //     delay: new FormControl('', [Validators.required]),
    //   }
    // )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
      this.Creators = response;
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
    this.ReportFormUpdate.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportFormUpdate.controls["description"].patchValue(this.AuditForm.description);
    this.ReportFormUpdate.controls["session_fk_id"].patchValue(this.AuditForm.session_fk_id);
  }
  onSubmit() {
    if (this.id != null) {
      // this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
      //   console.log(response)
      //   this.alertServices.success("با موفقیت ویرایش شد");
      //   this.router.navigate([this.cancle_link])
      // }
      // )
    }
    else {
      if (this.ReportFormAdd.invalid) {
        this.ReportFormAdd.markAllAsTouched();
        return;
      }
      this.btnLoading = true
      let ReportFormValue: ISessionCancellationAdd = {
        created_fk_by: this.ReportFormAdd.controls.created_fk_by.value,
        description: this.ReportFormAdd.controls.description.value,
        session_fk_id: this.ReportFormAdd.controls.session_fk_id.value
      }
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportFormAdd.reset();
      }
      )
    }
    this.btnLoading = false
  }
  GetClassData() {
    this.http.getAll(Domain.GetcourseData).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
  ChangeCourse(value: any) {
    this.http.get(Domain.GetSubCourseByCourseId, value.target.value).subscribe((response) => {
      console.log("sub is : ", response)
      this.sub_course_data = response;

    })
  }
  ChangeSubCourse(event: any) {
    this.http.get(Domain.GetSessionBySubCourseId, event.target.value).subscribe((response) => {
      this.session_data = response
    })
    let sub_course_teacher = this.sub_course_data.find((x) => x.sub_course_pk_id == event.target.value)?.teacher
    this.ReportFormAdd.controls["sub_course_teacher"].patchValue(sub_course_teacher?.name + "  " + sub_course_teacher?.last_name);
  }
}



