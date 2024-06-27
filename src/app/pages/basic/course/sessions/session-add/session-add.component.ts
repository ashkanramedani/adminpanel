import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ITeacherReplacementForm } from 'src/app/interfaces/ITeacherReplacementForm';
import { ISubCourse } from 'src/app/interfaces/ISubCourse';
import { ISessionForm } from 'src/app/interfaces/ISessionForm';
import { ICourse } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
})
export class SessionAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/sessions'
  form_title: string = "  جلسه "
  AuditForm: ISessionForm
  get_Singel_route: string = Domain.GetSession
  put_route: string = Domain.PutSesssion
  create_route: string = Domain.CreateSession
  //#endregion
  page_title: string = "ایجاد"
  SubCourseData: ISubCourse[]
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: ICourse [] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetCourseData()
    this.GetSubCourseData()
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        course_fk_id: new FormControl('', [Validators.required]),
        created_fk_by: new FormControl('', [Validators.required]),
        sub_course_fk_id: new FormControl('', [Validators.required]),
        session_teacher_fk_id: new FormControl('', [Validators.required]),
        is_sub: new FormControl('', [Validators.required]),
        session_date: new FormControl('', [Validators.required]),
        session_starting_time: new FormControl('21:11:27', [Validators.required]),
        session_ending_time: new FormControl('21:15:27', [Validators.required]),
        session_duration: new FormControl('', [Validators.required]),
        days_of_week: new FormControl('', [Validators.required]),
      }
    )
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
    this.ReportForm.controls["course_fk_id"].patchValue(this.AuditForm.course_fk_id);
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["sub_course_fk_id"].patchValue(this.AuditForm.sub_course_fk_id);
    this.ReportForm.controls["session_teacher_fk_id"].patchValue(this.AuditForm.session_teacher_fk_id);
    this.ReportForm.controls["is_sub"].patchValue(this.AuditForm.is_sub);
    this.ReportForm.controls["session_date"].patchValue(this.AuditForm.session_date)
    this.ReportForm.controls["session_starting_time"].patchValue(this.AuditForm.session_starting_time)
    this.ReportForm.controls["session_ending_time"].patchValue(this.AuditForm.session_ending_time)
    this.ReportForm.controls["session_duration"].patchValue(this.AuditForm.session_duration)
    this.ReportForm.controls["days_of_week"].patchValue(this.AuditForm.days_of_week)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISessionForm =
    {
      course_fk_id: this.ReportForm.controls.course_fk_id.value,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      sub_course_fk_id: this.ReportForm.controls.sub_course_fk_id.value,
      session_teacher_fk_id: this.ReportForm.controls.session_teacher_fk_id.value,
      is_sub: this.ReportForm.controls.is_sub.value,
      session_date: this.ReportForm.controls.session_date.value,
      session_starting_time: this.ReportForm.controls.session_starting_time.value,
      session_ending_time: this.ReportForm.controls.session_ending_time.value,
      session_duration: this.ReportForm.controls.session_duration.value,
      days_of_week: this.ReportForm.controls.days_of_week.value,
      session_pk_id: this.id
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
  GetCourseData() {
    this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
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

