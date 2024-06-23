import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Domain } from 'src/app/domain/doamin';
import { ICourse } from 'src/app/interfaces/ICourse';
import { ICourseCategory } from 'src/app/interfaces/ICourseCategory';
import { ICourseEditForm } from 'src/app/interfaces/ICourseEditForm';
import { ICourseForm } from 'src/app/interfaces/ICourseForm';
import { ICourseFormTag } from 'src/app/interfaces/ICourseFormTag';
import { ICourseLanguage } from 'src/app/interfaces/ICourseLanguage';
import { ICourseTag } from 'src/app/interfaces/ICourseTag';
import { ICourseType } from 'src/app/interfaces/ICourseType';
import { IUserFormRoles } from 'src/app/interfaces/IUserFormRoles';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
})
export class CourseAddComponent implements OnInit {
  ReportForm: FormGroup;
  RolesData: ICourse[] = []
  tagsInputArray:IUserFormRoles[]=[]
  tagsInputTitleArray: {role_id:string,role_title:string}[]=[]
  CourseTagData:ICourseTag[]=[]
  CourseCategoryData:ICourseCategory[]=[]
  CourseLanguageData:ICourseLanguage[]=[]
  id: any;
  TeacherInputArray: string[] = [];
  TeacherInputTitleArray: string[] = [];
  isOpenSearchTeacher: boolean = false;
  cancle_link:string='/basic/course'
  EmployiesData: IUsers[] = []
  CourseTypeData:ICourseType[]=[]
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: ICourseForm
  EditForm:ICourseEditForm
  isLoading:boolean=false
  isOpenSearchTag:boolean=false
  public editor:any = ClassicEditor;
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetCourseLanguageData()
    this.GetCourseTagData()
    this.GetCourseTypeData()
    this.GetCourseCategoryData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('',[Validators.required]),
        description: new FormControl(''),
        status: new FormControl('',[Validators.required]),
        course_name: new FormControl('',[Validators.required]),
        starting_date: new FormControl('',[Validators.required]),
        ending_date: new FormControl('',[Validators.required]),
        course_capacity: new FormControl('',[Validators.required]),
        course_language: new FormControl('',[Validators.required]),
        course_type: new FormControl('',[Validators.required]),
         tags: new FormControl(''),
         categories: new FormControl(''),
        course_code: new FormControl('',[Validators.required]),
        course_image: new FormControl('',),
        course_level: new FormControl('',[Validators.required]),
        package_discount: new FormControl('',[Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  OpenSearchTag(){
    this.isOpenSearchTag=!this.isOpenSearchTag;
  }
  AddTeacherInput(id: string, name: string, last_name: string) {
    if (id != '') {
      this.TeacherInputArray.push(id);
      this.TeacherInputTitleArray.push(name + " " + last_name)
    }
  }
  AddTagInput(id: string, name: string) {
    if (id != '') {
      let newRole={old_id:'',  new_id:id}
      this.tagsInputArray.push(newRole);
      this.tagsInputTitleArray. push( {role_id:id,role_title:name})
    }
  }


  RemoveTagInput(index: number) {
    this.tagsInputArray.splice(index, 1);
  }
  RemoveTeacherInput(index: number) {
    this.TeacherInputArray.splice(index, 1);
    this.TeacherInputTitleArray.splice(index, 1);
    console.log("TeacherInputArray" + this.TeacherInputArray)
    console.log("TeacherInputTitleArray" + this.TeacherInputTitleArray)

  }
  AddTagInputManually() {
    if (this.ReportForm.controls.tags.value.length > 0) {
      this.tagsInputArray.push(this.ReportForm.controls.tags.value);
      this.ReportForm.controls.tags.setValue('');
    }
  }
  OpenSearchTeacher() {
    this.isOpenSearchTeacher = !this.isOpenSearchTeacher;
  }
  GetCourseCategoryData(){
    this.http.getAll(Domain.GetCourseCategoryData).subscribe((response) => {
      this.CourseCategoryData = response;
      console.log(response)
    })
  }
  GetCourseLanguageData(){
    this.http.getAll(Domain.GetCourseLanguageData).subscribe((response) => {
      this.CourseLanguageData = response;
      console.log(response)
    })
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  GetCourseTypeData() {
    this.http.getAll(Domain.GetCourseType).subscribe((response) => {
      this.CourseTypeData = response;
      console.log(response)
    })
  }
  GetCourseTagData() {
    this.http.getAll(Domain.GetCourseTagData).subscribe((response) => {
      this.CourseTagData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetcourseData, this.id)
      .subscribe((response) => {
        console.log(response)
        this.EditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.EditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.EditForm.description);
    this.ReportForm.controls["status"].patchValue(this.EditForm.status);
    this.ReportForm.controls["course_name"].patchValue(this.EditForm.course_name)
    this.ReportForm.controls["starting_date"].patchValue(this.EditForm.starting_date);
    this.ReportForm.controls["ending_date"].patchValue(this.EditForm.ending_date)
    this.ReportForm.controls["course_capacity"].patchValue(this.EditForm.course_capacity);
    this.ReportForm.controls["course_language"].patchValue(this.EditForm.course_language)
    this.ReportForm.controls["course_type"].patchValue(this.EditForm.course_type);
    this.ReportForm.controls["course_code"].patchValue(this.EditForm.course_code)
    this.ReportForm.controls["course_image"].patchValue(this.EditForm.course_image);
    this.ReportForm.controls["course_level"].patchValue(this.EditForm.course_level);
    this.ReportForm.controls["package_discount"].patchValue(this.EditForm.package_discount)
    this.EditForm.tags.forEach((item, index) => {
      this.tagsInputTitleArray.push({role_id:item.tag_pk_id,role_title:item.tag_name})
    })
    this.EditForm.tags.forEach((item, index) => {
      this.tagsInputArray.push({old_id:'',  new_id:item.tag_pk_id})
    })
  }
  onSubmitNext(){
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ICourseForm =
    {
      course_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      course_name: this.ReportForm.controls.course_name.value,
      starting_date: this.ReportForm.controls.starting_date.value,
      ending_date: this.ReportForm.controls.ending_date.value,
      course_capacity: this.ReportForm.controls.course_capacity.value,
      course_language: this.ReportForm.controls.course_language.value,
      course_type: this.ReportForm.controls.course_type.value,
       tags: this.tagsInputArray.length <= 0 ? new Array({old_id:'',  new_id:''}) : this.tagsInputArray,
      // categories: [],
      course_code: this.ReportForm.controls.course_code.value,
      course_image: this.ReportForm.controls.course_image.value,
      course_level: this.ReportForm.controls.course_level.value,
      package_discount: this.ReportForm.controls.package_discount.value,
    }
    if (this.id != null) {
      this.http.put(Domain.PutcourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreatecourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
        this.router.navigate(['/basic/sub-course/add'], { queryParams: { course: response.id}})
      }
      )
    }
    this.btnLoading = false
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ICourseForm =
    {
      course_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      course_name: this.ReportForm.controls.course_name.value,
      starting_date: this.ReportForm.controls.starting_date.value,
      ending_date: this.ReportForm.controls.ending_date.value,
      course_capacity: this.ReportForm.controls.course_capacity.value,
      course_language: this.ReportForm.controls.course_language.value,
      course_type: this.ReportForm.controls.course_type.value,
       tags: this.tagsInputArray.length <= 0 ? new Array({old_id:'',  new_id:''}) : this.tagsInputArray,
      // categories: [],
      course_code: this.ReportForm.controls.course_code.value,
      course_image: this.ReportForm.controls.course_image.value,
      course_level: this.ReportForm.controls.course_level.value,
      package_discount: this.ReportForm.controls.package_discount.value,
    }
    if (this.id != null) {
      this.http.put(Domain.PutcourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreatecourseData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
      }
      )
    }
    this.btnLoading = false
  }
}

