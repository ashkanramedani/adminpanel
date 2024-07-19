
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { ISessionSignature } from 'src/app/interfaces/ISessionSignature';
import { ISubCourseAdd, ISubCourseSingle, ISubCourseUpdate } from 'src/app/interfaces/ISubCourse';
import { ICourseAll } from 'src/app/interfaces/ICourse';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-sub-course-add',
  templateUrl: './sub-course-add.component.html',
})
export class SubCourseAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/sub-course'
  form_title: string = "درس"
  AuditForm: ISubCourseSingle
  get_Singel_route: string = Domain.GetSubCourseData
  put_route: string = Domain.PutSubCourseData
  create_route: string = Domain.CreateSubCourseData
  //#endregion
  page_title: string = "ایجاد"
  ClassData: ICourseAll[] = []
  ReportForm: FormGroup;
  UpdateForm: FormGroup
  isOpenSearchRole: boolean = false
  id: any;
  session_signature_array: ISessionSignature[] = []
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  course_id: string
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.course_id = res.course;
    });

    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetClassData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        course_fk_id: new FormControl(this.course_id, [Validators.required]),
        sub_course_teacher_fk_id: new FormControl('', [Validators.required]),
        sub_course_name: new FormControl('', [Validators.required]),
        number_of_session: new FormControl('', [Validators.required]),
        sub_course_starting_date: new FormControl('', [Validators.required]),
        sub_course_ending_date: new FormControl('', [Validators.required]),
        session_signature: new FormControl(''),
        days_of_week: new FormControl(''),
        starting_time: new FormControl('15:45:14'),
        duration: new FormControl(''),
        sub_request_threshold: new FormControl<number>(1, [Validators.required]),
      }
    )
    this.UpdateForm = this.formBuilder.group({
      created_fk_by: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      sub_course_teacher_fk_id: new FormControl('', [Validators.required]),
      sub_course_name: new FormControl('', [Validators.required])
    })
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetClassData() {
    this.http.getAll(Domain.GetcourseData).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
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
    this.UpdateForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.UpdateForm.controls["description"].patchValue(this.AuditForm.description);
    this.UpdateForm.controls["sub_course_name"].patchValue(this.AuditForm.sub_course_name);
    this.UpdateForm.controls["sub_course_teacher_fk_id"].patchValue(this.AuditForm.sub_course_teacher_fk_id)
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id != null) {
      if (this.UpdateForm.invalid) {
        this.UpdateForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      let ReportFormUpdate: ISubCourseUpdate =
      {
        created_fk_by: this.UpdateForm.controls.created_fk_by.value,
        description: this.UpdateForm.controls.description.value,
        sub_course_teacher_fk_id: this.UpdateForm.controls.sub_course_teacher_fk_id.value,
        sub_course_name: this.UpdateForm.controls.sub_course_name.value,
        sub_course_pk_id: this.id,
      }
      this.http.put(this.put_route, ReportFormUpdate, null).subscribe((response) => {
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
      let ReportFormAdd: ISubCourseAdd =
      {
        created_fk_by: this.ReportForm.controls.created_fk_by.value,
        description: this.ReportForm.controls.description.value,
        course_fk_id: this.ReportForm.controls.course_fk_id.value,
        sub_course_teacher_fk_id: this.ReportForm.controls.sub_course_teacher_fk_id.value,
        sub_course_name: this.ReportForm.controls.sub_course_name.value,
        number_of_session: this.ReportForm.controls.number_of_session.value,
        sub_course_starting_date: moment.from(this.ReportForm.controls.sub_course_starting_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
        sub_course_ending_date: moment.from(this.ReportForm.controls.sub_course_ending_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
        sub_request_threshold: this.ReportForm.controls.sub_request_threshold.value,
        session_signature: this.session_signature_array
      }
      this.http.create(this.create_route, ReportFormAdd, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
        this.session_signature_array=[]
      }
      )
    }
    this.btnLoading = false
  }

  add_session_signature() {
    let days_of_week = this.ReportForm.controls.days_of_week.value
    let starting_time = this.ReportForm.controls.starting_time.value
    let duration = this.ReportForm.controls.duration.value
    this.session_signature_array.push({ days_of_week: days_of_week, starting_time: starting_time, duration: duration });
  }
  remove_session_signature(index: number) {
    this.session_signature_array.splice(index, 1);
  }
}

