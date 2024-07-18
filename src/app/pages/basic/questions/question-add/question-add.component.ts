import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { IQuestionsForm } from 'src/app/interfaces/IQuestionsForm';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
})
export class QuestionAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/questions'
  form_title:string="سوال"
  AuditForm: IQuestionsForm
  get_Singel_route: string = Domain.GetQuestionData
  put_route: string = Domain.PutQuestionData
  create_route: string = Domain.CreateQuestionData
  //#endregion
  page_title: string = "ایجاد"
  ReportForm: FormGroup;
  RolesData: IRoles[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('',[Validators.required]),
        description: new FormControl(''), 
        text: new FormControl('',[Validators.required]),
        language: new FormControl('',[Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
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
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["text"].patchValue(this.AuditForm.text)
    this.ReportForm.controls["language"].patchValue(this.AuditForm.language)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: IQuestionsForm =
    {
      question_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      text: this.ReportForm.controls.text.value,
      language: this.ReportForm.controls.language.value,
      create_date:''

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

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }


}

