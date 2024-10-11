import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { ICourseUpdate } from 'src/app/interfaces/ICourse';
import { ICourseCategoryAll } from 'src/app/interfaces/ICourseCategory';
import { ICourseLanguageAll } from 'src/app/interfaces/ICourseLanguage';
import { ICourseTagAll } from 'src/app/interfaces/ICourseTag';
import { ICourseTypeAll } from 'src/app/interfaces/ICourseType';
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
  tagsInputArray:IUserFormRoles[]=[]
  tagsInputTitleArray: {role_id:string,role_title:string}[]=[]
  CourseTagData:ICourseTagAll[]=[]
  CourseCategoryData:ICourseCategoryAll[]=[]
  CourseLanguageData:ICourseLanguageAll[]=[]
  id: any;
  imageUrl: any;
  TeacherInputArray: string[] = [];
  isOpenSearchTeacher: boolean = false;
  cancle_link:string='/basic/course'
  EmployiesData: IUsers[] = []
  CourseTypeData:ICourseTypeAll[]=[]
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: ICourseUpdate
  EditForm:ICourseUpdate
  isLoading:boolean=false
  isOpenSearchTag:boolean=false
  public editor:any = ClassicEditor;
  isOpenTagAdd:boolean=false
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
        package_discount: new FormControl<number>(0,[Validators.required]),
        Course_price: new FormControl('',[Validators.required]),
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

  AddTagInput(id: string, name: string) {
    if ((id != '') && (this.tagsInputArray.filter(x=>x.new_id===id).length<1)) {
      let newRole={old_id:'',  new_id:id}
      this.tagsInputArray.push(newRole);
      this.tagsInputTitleArray. push( {role_id:id,role_title:name})
    }
  }

  RemoveTagInput(id: string,index:number) {
    this.tagsInputTitleArray.splice(index,1)
    this.tagsInputArray.splice(this.tagsInputArray.findIndex(x=>x.new_id===id), 1);
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
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
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
        console.log("EditForm:",response)
        this.EditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.EditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.EditForm.description);
    this.ReportForm.controls["course_name"].patchValue(this.EditForm.course_name)
    this.ReportForm.controls["starting_date"].patchValue(moment(this.EditForm.starting_date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["ending_date"].patchValue(moment(this.EditForm.ending_date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["course_capacity"].patchValue(this.EditForm.course_capacity);
    this.ReportForm.controls["course_language"].patchValue(this.EditForm.course_language)
    this.ReportForm.controls["course_type"].patchValue(this.EditForm.course_type);
    this.ReportForm.controls["course_code"].patchValue(this.EditForm.course_code)
    this.ReportForm.controls["course_image"].patchValue(this.EditForm.course_image);
    this.ReportForm.controls["course_level"].patchValue(this.EditForm.course_level);
    this.ReportForm.controls["package_discount"].patchValue(this.EditForm.package_discount)
    this.ReportForm.controls["Course_price"].patchValue(this.EditForm.Course_price.toLocaleString())
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
    let ReportFormValue: ICourseUpdate =
    {
      course_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      course_name: this.ReportForm.controls.course_name.value,
      starting_date: moment.from(this.ReportForm.controls.starting_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
      ending_date: moment.from(this.ReportForm.controls.ending_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
      course_capacity: this.ReportForm.controls.course_capacity.value,
      course_language: this.ReportForm.controls.course_language.value,
      course_type: this.ReportForm.controls.course_type.value,
      Course_price: this.ReportForm.controls.Course_price.value.replace(/,/g, ""),
       tags: this.tagsInputArray.length <= 0 ? new Array({old_id:'',  new_id:''}) : this.tagsInputArray,
       categories: new Array(),
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
    let ReportFormValue: ICourseUpdate =
    {
      categories:new Array(),
      Course_price: this.ReportForm.controls.Course_price.value.replace(/,/g, ""),
      course_pk_id: this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      course_name: this.ReportForm.controls.course_name.value,
      starting_date: moment.from(this.ReportForm.controls.starting_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
      ending_date: moment.from(this.ReportForm.controls.ending_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
      course_capacity: this.ReportForm.controls.course_capacity.value,
      course_language: this.ReportForm.controls.course_language.value,
      course_type: this.ReportForm.controls.course_type.value,
       tags: this.tagsInputArray.length <= 0 ? new Array({old_id:'',  new_id:''}) : this.tagsInputArray,
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
  UploadImage(event: any) {
    if (event && event.target && event.target.files) {
      let image: any = event.target.files[0];
      let fr = new FileReader();
      fr.onload = (e: any) => {
        // when file has loaded
        var img = new Image();
        img.onload = () => {
          if (img.height != 500 && img.height != 500)
            this.alertServices.error(' اندازه عکس مجاز 500*500  می باشد');
          else this.imageUrl = e.target.result;
        };
        img.src = e.target.result; // The data URL
      };
      fr.readAsDataURL(image);
    }
  }
  RemoveImage() {
    this.imageUrl = '';
  }
  CLoseTagAdd(){
    this.isOpenTagAdd=false
  }
  OpenTagAdd(){
    this.isOpenTagAdd=true
  }
}

