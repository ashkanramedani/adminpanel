import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ISupervisorSingle } from 'src/app/interfaces/ISupervisor';
import { ITeacherSummeryBody } from 'src/app/interfaces/ITeachersSalary';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-second-stage',
  templateUrl: './second-stage.component.html',
})
export class SecondStageComponent implements OnInit{
  myForm: FormGroup
  supervisorReview= {} as ISupervisorSingle
  data: any[] = []
  btnLoading: boolean = false
  private readonly http = inject(HttpService)
  private readonly router = inject(Router)
  @Input() subcourse_id: string

  constructor() {
    this.myForm = new FormGroup({
      cancellation_factor: new FormControl<number>(2,[Validators.required,Validators.min(2),Validators.max(10),Validators.maxLength(2)]),
      CPD: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      Odd_hours: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      content_creation: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      event_participate: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      survey_score: new FormControl('average', [Validators.required]),
      LP_submission: new FormControl('average', [Validators.required]),
      report_to_student: new FormControl('average', [Validators.required]),
      student_assign_feedback: new FormControl('average', [Validators.required]),
      result_submission_to_FD: new FormControl('average', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getSupervisorReview()
  }
  getSupervisorReview(){
    this.http.get(Domain.GetSupervisor,this.subcourse_id).subscribe((res)=>
    {
      this.supervisorReview=res
    })
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let myFormValue: ITeacherSummeryBody =
    {
      cancellation_factor: this.myForm.controls.cancellation_factor.value,
      CPD: this.myForm.controls.CPD.value,
      Odd_hours: this.myForm.controls.Odd_hours.value,
      content_creation: this.myForm.controls.content_creation.value,
      event_participate: this.myForm.controls.event_participate.value,
      survey_score: this.myForm.controls.survey_score.value,
      LP_submission: this.myForm.controls.LP_submission.value,
      report_to_student: this.myForm.controls.report_to_student.value,
      student_assign_feedback: this.myForm.controls.student_assign_feedback.value,
      result_submission_to_FD: this.myForm.controls.result_submission_to_FD.value,
    }
    this.http.create(`${Domain.PostTeacherSummary}/${this.subcourse_id}`, myFormValue, null).subscribe((response) => {
      console.log(response)
      this.http.setData(response)
      this.router.navigate(['/reports/teacher-salary/' + this.subcourse_id], { queryParams: { step: "7" } })
    }
    )
    this.btnLoading = false
  }
}
