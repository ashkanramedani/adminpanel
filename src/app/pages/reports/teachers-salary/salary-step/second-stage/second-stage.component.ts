import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ITeacherSummeryBody } from 'src/app/interfaces/ITeachersSalary';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-second-stage',
  templateUrl: './second-stage.component.html',
})
export class SecondStageComponent {
  myForm: FormGroup
  btnLoading:boolean=false
  private readonly http=inject(HttpService)
  private readonly router=inject(Router)
  @Input() subcourse_id:string

  constructor() {
    this.myForm = new FormGroup({
      reward: new FormControl<number>(0),
      punishment: new FormControl<number>(0),
      loan: new FormControl<number>(0),
      cancellation_factor: new FormControl<number>(0),
      content_creation: new FormControl<number>(0),
      event_participate: new FormControl<number>(0),
      CPD: new FormControl<number>(0),
      Odd_hours: new FormControl<number>(0),
      report_to_student: new FormControl<string>('weak'),
      LP_submission: new FormControl<string>('weak'),
      student_assign_feedback: new FormControl<string>('weak'),
      survey_score: new FormControl<string>('weak'),
      result_submission_to_FD: new FormControl<string>('weak')
    })
  }
  onSubmit() {
    this.btnLoading = true
    let myFormValue: ITeacherSummeryBody =
    {
      reward: this.myForm.controls.reward.value,
      punishment: this.myForm.controls.punishment.value,
      loan: this.myForm.controls.loan.value,
      cancellation_factor: this.myForm.controls.cancellation_factor.value,
      content_creation: this.myForm.controls.content_creation.value,
      event_participate: this.myForm.controls.event_participate.value,
      CPD: this.myForm.controls.CPD.value,
      Odd_hours: this.myForm.controls.Odd_hours.value,
      report_to_student: this.myForm.controls.report_to_student.value,
      LP_submission: this.myForm.controls.LP_submission.value,
      student_assign_feedback: this.myForm.controls.student_assign_feedback.value,
      survey_score: this.myForm.controls.survey_score.value,
      result_submission_to_FD: this.myForm.controls.result_submission_to_FD.value
    }
      this.http.create(`${Domain.PostTeacherSummary}/${this.subcourse_id}` , myFormValue, null).subscribe((response) => {
        console.log(response)
        this.router.navigate(['/reports/teacher-salary/' + this.subcourse_id], { queryParams: { step: "7" } ,state:response},)
      }
      )
    this.btnLoading = false
  }
}
