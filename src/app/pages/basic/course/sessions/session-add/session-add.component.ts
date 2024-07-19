import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ISessionAdd, ISessionUpdate } from 'src/app/interfaces/ISession';
import { ISubCourseAll } from 'src/app/interfaces/ISubCourse';
import { ICourseAll } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
})
export class SessionAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/sessions'
  form_title: string = "  جلسه "
  AuditForm: ISessionUpdate
  get_Singel_route: string = Domain.GetSession
  put_route: string = Domain.PutSesssion
  create_route: string = Domain.CreateSession
  //#endregion
  page_title: string = "ایجاد"
  SubCourseData: ISubCourseAll[] = []
  ReportForm: FormGroup;
  EditForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: ICourseAll[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetCourseData()
    this.GetSubCourseData()
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl('',),
        session_teacher_fk_id: new FormControl('', [Validators.required]),
        session_date: new FormControl('', [Validators.required]),
        session_starting_time: new FormControl('09:14:35', [Validators.required]),
        session_duration: new FormControl('', [Validators.required]),
        sub_request_threshold: new FormControl('', [Validators.required]),
        course_fk_id: new FormControl('', [Validators.required]),
        sub_course_fk_id: new FormControl('', [Validators.required]),
      }
    )
    this.EditForm = this.formBuilder.group({
      created_fk_by: new FormControl('', [Validators.required]),
      description: new FormControl('',),
      session_teacher_fk_id: new FormControl('', [Validators.required]),
      session_date: new FormControl('', [Validators.required]),
      session_starting_time: new FormControl('09:14:35', [Validators.required]),
      session_duration: new FormControl('', [Validators.required]),
      sub_request_threshold: new FormControl('', [Validators.required]),
    })
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(`${Domain.GetUsers}?page=1&limit=1000&order=desc`).subscribe((response) => {
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
    this.EditForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.EditForm.controls["description"].patchValue(this.AuditForm.description);
    this.EditForm.controls["session_teacher_fk_id"].patchValue(this.AuditForm.session_teacher_fk_id);
    this.EditForm.controls["session_date"].patchValue(this.AuditForm.session_date)
    this.EditForm.controls["session_starting_time"].patchValue(this.AuditForm.session_starting_time)
    this.EditForm.controls["session_duration"].patchValue(this.AuditForm.session_duration)
    this.EditForm.controls["sub_request_threshold"].patchValue(this.AuditForm.sub_request_threshold)
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id != null) {
      if (this.EditForm.invalid) {
        this.EditForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      let UpdateFormValue: ISessionUpdate =
      {
        description: this.EditForm.controls.description.value,
        sub_request_threshold: this.EditForm.controls.sub_request_threshold.value,
        created_fk_by: this.EditForm.controls.created_fk_by.value,
        session_teacher_fk_id: this.EditForm.controls.session_teacher_fk_id.value,
        session_date: this.EditForm.controls.session_date.value,
        session_starting_time: this.EditForm.controls.session_starting_time.value,
        session_duration: this.EditForm.controls.session_duration.value,
        session_pk_id: this.id
      }
      this.http.put(this.put_route, UpdateFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      })
    }
    else {
      if (this.ReportForm.invalid) {
        this.ReportForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      let ReportFormValue: ISessionAdd =
      {
        description: this.ReportForm.controls.description.value,
        sub_request_threshold: this.ReportForm.controls.sub_request_threshold.value,
        course_fk_id: this.ReportForm.controls.course_fk_id.value,
        created_fk_by: this.ReportForm.controls.created_fk_by.value,
        sub_course_fk_id: this.ReportForm.controls.sub_course_fk_id.value,
        session_teacher_fk_id: this.ReportForm.controls.session_teacher_fk_id.value,
        session_date: this.ReportForm.controls.session_date.value,
        session_starting_time: this.ReportForm.controls.session_starting_time.value,
        session_duration: this.ReportForm.controls.session_duration.value,
      }
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
      })
    }
    this.btnLoading = false
  }

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }
  GetCourseData() {
    this.http.getAll(Domain.GetcourseData).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
  GetSubCourseData() {
    this.http.getAll(Domain.GetSubCourseData).subscribe((response) => {
      this.SubCourseData = response;
      console.log(response)
    })
  }

}

