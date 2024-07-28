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
import { ISubCourseAll } from 'src/app/interfaces/ISubCourse';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';

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
  Creators:IUsers[]=[]
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
  sub_course_data:ISubCourseAll[]=[]
  id: any;
  EmployiesData={} as IUsers |undefined
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    //this.GetSubCourseData()
    this.GetEmployeeData()
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.ReportForm = this.formBuilder.group(
      {

        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        course_fk_id: new FormControl('', [Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        delay: new FormControl('', [Validators.required]),
        sub_course_fk_id:new FormControl('', [Validators.required]),
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
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["course_fk_id"].patchValue(this.AuditForm.course_fk_id);
    this.ReportForm.controls["teacher_fk_id"].patchValue(this.AuditForm.teacher_fk_id);
    this.ReportForm.controls["delay"].patchValue(this.AuditForm.delay)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ITardeyRequestForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      course_fk_id: this.ReportForm.controls.course_fk_id.value,
      teacher_fk_id: this.ReportForm.controls.teacher_fk_id.value,
      delay: this.ReportForm.controls.delay.value,
      teacher_tardy_reports_pk_id:this.id,
      sub_course_fk_id:this.ReportForm.controls.sub_course_fk_id.value,

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
        this.btnLoading = false
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
  // GetSubCourseData(id:string) {
  //   this.http.get(Domain.GetSubCourseData,id).subscribe((response) => {
  //     this.sub_course_data = response;
  //     console.log(response)
  //   })
  // }

  ChangeCourse(value:any){
    this.http.get(Domain.GetSubCourseByCourseId,value.target.value).subscribe((response)=>{
      console.log("sub is : " ,response)
      this.sub_course_data = response;

    })

}
ChangeSubCourse(event:any){
  this.EmployiesData=this.sub_course_data.find((x)=>x.sub_course_pk_id==event.target.value)?.teacher
  }
  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
      this.Creators = response;
      console.log(response)
    })
  }
}
