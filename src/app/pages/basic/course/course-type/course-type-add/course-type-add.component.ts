import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { ICourseLanguageForm } from 'src/app/interfaces/ICourseLanguageForm';
import { ICourseTypeForm } from 'src/app/interfaces/ICourseTypeForm';

@Component({
  selector: 'app-course-type-add',
  templateUrl: './course-type-add.component.html',
})
export class CourseTypeAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/course-type'
  form_title:string="نوع دوره"
  AuditForm: ICourseTypeForm
  get_Singel_route: string = Domain.GetCourseType
  put_route: string = Domain.PutCourseType
  create_route: string = Domain.CreateCourseType
  //#endregion
  page_title: string = "ایجاد"
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('',[Validators.required]),
        course_type_name: new FormControl('',[Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
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
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status);
    this.ReportForm.controls["course_type_name"].patchValue(this.AuditForm.course_type_name);
    this.ReportForm.controls["language_pk_id"].patchValue(this.id);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ICourseTypeForm=
    {
      course_type_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      course_type_name: this.ReportForm.controls.course_type_name.value,

    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
        this.btnLoading = false
      }
      )
    }
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

