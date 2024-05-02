import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { ICourse } from 'src/app/interfaces/ICourse';
import { ICourseForm } from 'src/app/interfaces/ICourseForm';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent implements OnInit {
  ReportForm: FormGroup;
  RolesData: ICourse[] = []
  id: any;
  TeacherInputArray: string[] = [];
  TeacherInputTitleArray: string[] = [];
  isOpenSearchTeacher: boolean = false;
  EmployiesData: IEmployees[] = []
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: ICourseForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('',[Validators.required]),
        name: new FormControl('', [Validators.required]),
        teachers: new FormControl(''),
        course_time: new FormControl('',[Validators.required]),
        duration: new FormControl('',[Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  AddTeacherInput(id: string, name: string,last_name:string) {
    if (id != '') {
      this.TeacherInputArray.push(id);
      this.TeacherInputTitleArray.push(name+ " "+last_name)
    }
  }
  RemoveTeacherInput(index: number) {
    this.TeacherInputArray.splice(index, 1);
    this.TeacherInputTitleArray.splice(index, 1);
    console.log("TeacherInputArray"+ this.TeacherInputArray)
    console.log("TeacherInputTitleArray"+ this.TeacherInputTitleArray)

  }
  OpenSearchTeacher() {
    this.isOpenSearchTeacher = !this.isOpenSearchTeacher;
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetcourseData, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["name"].patchValue(this.AuditForm.name);
    //this.AuditForm.teachers .forEach(val => this.TeacherInputArray.push(Object.assign({}, val)));
    this.ReportForm.controls["course_time"].patchValue(this.AuditForm.course_time);
    this.ReportForm.controls["duration"].patchValue(this.AuditForm.duration)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ICourseForm =
    {
      course_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      name: this.ReportForm.controls.name.value,
      teachers: this.TeacherInputArray,
      //course_time: this.ReportForm.controls.course_time.value,
      course_time:moment.from(this.ReportForm.controls.course_time.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),

      duration: this.ReportForm.controls.duration.value,
    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(Domain.PutcourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreatecourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading = false
      }
      )
    }
  }
}

