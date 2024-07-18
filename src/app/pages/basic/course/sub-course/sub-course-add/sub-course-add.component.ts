
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import * as moment from 'jalali-moment';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ISessionSignature } from 'src/app/interfaces/ISessionSignature';
import { ISubCourseUpdate } from 'src/app/interfaces/ISubCourse';
import { ICourseAll } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-sub-course-add',
  templateUrl: './sub-course-add.component.html',
})
export class SubCourseAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/sub-course'
  form_title:string="درس"
  AuditForm: ISubCourseUpdate
  get_Singel_route: string = Domain.GetSubCourseData
  put_route: string = Domain.PutSubCourseData
  create_route: string = Domain.CreateSubCourseData
  //#endregion
  page_title: string = "ایجاد"
  ClassData: ICourseAll[] = []
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  id: any;
  session_signature_value:ISessionSignature[]=[]
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  course_id:string
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
    this.course_id = res.course;
  });

    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetClassData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''), 
        course_fk_id:new FormControl(this.course_id,[Validators.required]),
        sub_course_teacher_fk_id:new FormControl('',[Validators.required]),
        sub_course_name:new FormControl('',[Validators.required]),
        number_of_session:new FormControl('',[Validators.required]),
        sub_course_starting_date:new FormControl('',[Validators.required]),
        sub_course_ending_date:new FormControl('',[Validators.required]),
        session_signature:new FormControl(''),
        sub_request_threshold:new FormControl<number>(1,[Validators.required]),
      }
    )
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
    // this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    // this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    // this.ReportForm.controls["course_fk_id"].patchValue(this.AuditForm.course_fk_id);
    // this.ReportForm.controls["sub_course_teacher_fk_id"].patchValue(this.AuditForm.sub_course_teacher_fk_id)
    // this.ReportForm.controls["sub_course_name"].patchValue(this.AuditForm.sub_course_name)
    // this.ReportForm.controls["number_of_session"].patchValue(this.AuditForm.number_of_session);
    // this.ReportForm.controls["sub_course_teacher_fk_id"].patchValue(this.AuditForm.sub_course_teacher_fk_id)
    // this.ReportForm.controls["sub_course_name"].patchValue(this.AuditForm.sub_course_name)
    // this.ReportForm.controls["sub_course_starting_date"].patchValue(moment(this.AuditForm.sub_course_starting_date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD'));
    // this.ReportForm.controls["sub_course_ending_date"].patchValue(moment(this.AuditForm.sub_course_ending_date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD'));
    // this.ReportForm.controls["sub_request_threshold"].patchValue(this.AuditForm.sub_request_threshold)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISubCourseUpdate =
    {

      //session_signature:this.session_signature_value,
      sub_course_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      //course_fk_id: this.ReportForm.controls.course_fk_id.value,
      sub_course_teacher_fk_id: this.ReportForm.controls.sub_course_teacher_fk_id.value,
      sub_course_name: this.ReportForm.controls.sub_course_name.value,
      //sub_request_threshold:this.ReportForm.controls.sub_request_threshold.value,
      //number_of_session: this.ReportForm.controls.number_of_session.value,
      //sub_course_starting_date: moment.from(this.ReportForm.controls.sub_course_starting_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      //sub_course_ending_date: moment.from(this.ReportForm.controls.sub_course_ending_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
    }
    console.log(ReportFormValue)
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

  OpenSearchRole() {
    this.isOpenSearchRole = !this.isOpenSearchRole;
  }
  AddRoleInput(id: string, name: string) {
    if (id != '') {
      this.RolesInputArray.push(id);
      this.RolesInputTitleArray.push(name)
    }
  }
  RemoveRoleInput(index: number) {
    this.RolesInputArray.splice(index, 1);
    this.RolesInputTitleArray.splice(index, 1);
  }
}

