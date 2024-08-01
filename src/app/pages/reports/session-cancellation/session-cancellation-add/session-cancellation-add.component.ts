import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import * as moment from 'jalali-moment';
import { ISessionCancellationForm } from 'src/app/interfaces/ISessionCancellationForm';
import { ICourseAll } from 'src/app/interfaces/ICourse';
import { ISubCourseAll } from 'src/app/interfaces/ISubCourse';
import { ISession } from 'src/app/interfaces/ISession';

@Component({
  selector: 'app-session-cancellation-add',
  templateUrl: './session-cancellation-add.component.html',
})
export class SessionCancellationAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/session_cancellation'
  form_title:string="   کنسلی جلسه"
  AuditForm: ISessionCancellationForm
  get_Singel_route: string = Domain.GetSessionCancellation
  put_route: string = Domain.PutSessionCancellation
  create_route: string = Domain.CreateSessionCancellation
  Creators:IUsers[]=[]
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab:number=1
  OpenTab(value:number){
    this.isOpenTab=value
  }
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  ClassData: ICourseAll [] = []
  sub_course_data:ISubCourseAll[]=[]
  session_sub_course_data: ISession[]=[]
  id: any;
  btnLoading: boolean = false
  isLoading: boolean = false

  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        session_fk_id: new FormControl('', [Validators.required]),
      }
    )
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
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["session_fk_id"].patchValue(this.AuditForm.session_fk_id);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISessionCancellationForm = {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      session_fk_id: this.ReportForm.controls.session_fk_id.value
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
    this.http.getAll(Domain.GetcourseData).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
  ChangeCourse(value:any){
    this.http.get(Domain.GetSubCourseByCourseId,value.target.value).subscribe((response)=>{
      console.log("sub is : " ,response)
      this.sub_course_data = response;

    })
  }
  ChangeSubCourse(event:any){
    this.http.get(Domain.GetSessionSubcourse, event.target.value).subscribe((response)=>{
      console.log("session is : " ,response)
      this.session_sub_course_data = response;
    })
  }    
}



