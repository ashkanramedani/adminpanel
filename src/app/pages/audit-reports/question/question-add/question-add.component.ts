import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ICourse } from 'src/app/interfaces/ICourse';
import { ICourseForm } from 'src/app/interfaces/ICourseForm';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IQuestions } from 'src/app/interfaces/IQuestions';
import { IQuestionsForm } from 'src/app/interfaces/IQuestionsForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrl: './question-add.component.css'
})
export class QuestionAddComponent implements OnInit {
  ReportForm: FormGroup;
  RolesData: IQuestions[] = []
  id: any;
  EmployiesData: IEmployees[] = []
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: IQuestionsForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('',[Validators.required]),
        description: new FormControl(''),
        status: new FormControl('',),
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
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetQuestionData, this.id)
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
    this.ReportForm.controls["text"].patchValue(this.AuditForm.text)
    this.ReportForm.controls["language"].patchValue(this.AuditForm.language)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IQuestionsForm =
    {
      question_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      text: this.ReportForm.controls.text.value,
      language: this.ReportForm.controls.language.value,
    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(Domain.PutQuestionData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
    
    )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreateQuestionData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading = false
      }
      )
    }
  }
}



