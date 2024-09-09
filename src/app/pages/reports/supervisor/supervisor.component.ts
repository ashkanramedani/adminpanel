
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ISubCourseAll, ISubCourseSingle } from 'src/app/interfaces/ISubCourse';
import { ISupervisorInsert } from 'src/app/interfaces/ISupervisor';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
})
export class SupervisorComponent implements OnInit{
  myForm: FormGroup
  data: any[] = []
  SubCourseData= {} as ISubCourseSingle
  cancle_link: string = '/reports/class_cancellation'
  btnLoading: boolean = false
  private readonly http = inject(HttpService)
  private readonly router = inject(Router)
  private route=inject (ActivatedRoute)
  subcourse_id: any

  constructor() {
    this.myForm = new FormGroup({
      CPD: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      Odd_hours: new FormControl<number>(0,[Validators.required,Validators.min(0),Validators.max(100)]),
      rewards_earning: new FormControl<number>(0,[Validators.required]),
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
    this.subcourse_id = this.route.snapshot?.paramMap.get('id');
    this.getSubCourse()
  }
  getSubCourse(){
    this.http.get(Domain.GetSubCourseData,this.subcourse_id).subscribe((response) => {
          this.SubCourseData = response;
          console.log(response)
        })
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let myFormValue: ISupervisorInsert =
    {
      rewards_earning:this.myForm.controls.rewards_earning.value,
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
    this.http.create(`${Domain.PostSupervisor}/${this.subcourse_id}`, myFormValue, null).subscribe((response) => {
      console.log(response)
      //this.http.setData(response)
      this.router.navigate(['/reports/teacher-salary/' + this.subcourse_id], { queryParams: { step: "7" } })
    }
    )
    this.btnLoading = false
  }
}
