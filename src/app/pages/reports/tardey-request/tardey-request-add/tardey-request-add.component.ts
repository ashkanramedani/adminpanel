import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ISubCourseAll } from 'src/app/interfaces/ISubCourse';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { ITardeyRequestAdd, ITardeyRequestSingle, ITardeyRequestUpdate } from 'src/app/interfaces/ITardeyRequest';
import { ISessionAll } from 'src/app/interfaces/ISession';

@Component({
  selector: 'app-tardey-request-add',
  templateUrl: './tardey-request-add.component.html',
})
export class TardeyRequestAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/tardy_request'
  form_title: string = "  تاخیر اساتید"
  AuditForm: ITardeyRequestSingle
  get_Singel_route: string = Domain.GetTardeyRequest
  put_route: string = Domain.PutTardeyRequest
  create_route: string = Domain.CreateTardeyRequest
  Creators: IUsers[] = []
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab: number = 1
  OpenTab(value: number) {
    this.isOpenTab = value
  }
  ReportFormAdd: FormGroup;
  ReportFormUpdate: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: IClassDetails[] = []
  sub_course_data: ISubCourseAll[] = []
  session_data:ISessionAll[]=[]
  id: any;
  EmployiesData = {} as IUsers | undefined
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.GetEmployeeData()
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.ReportFormAdd = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        delay: new FormControl('', [Validators.required]),
        session_fk_id: new FormControl('', [Validators.required]),
      }
    )
    this.ReportFormUpdate = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        delay: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
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
    // this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    // this.ReportForm.controls["delay"].patchValue(this.AuditForm.delay)
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id != null) {
      if (this.ReportFormUpdate.invalid) {
        this.ReportFormUpdate.markAllAsTouched();
        return;
      }
      let formUpdateValue: ITardeyRequestUpdate =
      {
        created_fk_by: this.ReportFormAdd.controls.created_fk_by.value,
        description: this.ReportFormAdd.controls.description.value,
        delay: this.ReportFormAdd.controls.delay.value,
        teacher_tardy_report_pk_id: this.id
      }
      this.http.put(this.put_route, formUpdateValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      if (this.ReportFormAdd.invalid) {
        this.ReportFormAdd.markAllAsTouched();
        return;
      }
      let formAddValue: ITardeyRequestAdd =
      {
        created_fk_by: this.ReportFormAdd.controls.created_fk_by.value,
        description: this.ReportFormAdd.controls.description.value,
        delay: this.ReportFormAdd.controls.delay.value,
        session_fk_id: this.ReportFormAdd.controls.session_fk_id.value
      }
      this.http.create(this.create_route, formAddValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportFormAdd.reset();
        this.btnLoading = false
      })
    }
    this.btnLoading = false
  }
  GetClassData() {
    this.http.getAll(Domain.GetcourseData).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
  // GetSubCourseData(id:string) {
  //   this.http.get(Domain.GetSubCourseData,id).subscribe((response) => {
  //     this.sub_course_data = response;
  //     console.log(response)
  //   })
  // }
  getSessionDate(){
    this.http.getAll(Domain.GetSession).subscribe((response) => {
      this.session_data = response;
    })
  }
  ChangeCourse(value: any) {
    this.http.get(Domain.GetSubCourseByCourseId, value.target.value).subscribe((response) => {
      console.log("sub is : ", response)
      this.sub_course_data = response;

    })

  }
  ChangeSubCourse(event: any) {
    this.EmployiesData = this.sub_course_data.find((x) => x.sub_course_pk_id == event.target.value)?.teacher
  }
  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
      this.Creators = response;
      console.log(response)
    })
  }
}
