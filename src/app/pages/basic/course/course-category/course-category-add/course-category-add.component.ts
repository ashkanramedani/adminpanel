import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ICourseCategoryAll, ICourseCategoryUpdate } from 'src/app/interfaces/ICourseCategory';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-course-category-add',
  templateUrl: './course-category-add.component.html',
})
export class CourseCategoryAddComponent implements OnInit {
  ReportForm: FormGroup;
  tagsInputArray: string[] = [];
  CourseCategoryData: ICourseCategoryAll[] = []
  id: any;
  TeacherInputArray: string[] = [];
  TeacherInputTitleArray: string[] = [];
  isOpenSearchTeacher: boolean = false;
  EmployiesData: IUsers[] = []
  page_title: string = "ایجاد دسته بندی دوره"
  btnLoading: boolean = false
  AuditForm: ICourseCategoryUpdate
  cancle_link:string='/basic/course-category'
  isLoading: boolean = false
  isOpenSearchTag: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        category_name: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش دسته بندی دوره';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetCourseCategoryData, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["category_name"].patchValue(this.AuditForm.category_name)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ICourseCategoryUpdate =
    {
      category_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      category_name: this.ReportForm.controls.category_name.value,
    }
    if (this.id != null) {
      this.http.put(Domain.PutCourseCategoryData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      this.http.create(Domain.CreateCourseCategoryData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
      }
      )
    }
    this.btnLoading = false
  }
}

