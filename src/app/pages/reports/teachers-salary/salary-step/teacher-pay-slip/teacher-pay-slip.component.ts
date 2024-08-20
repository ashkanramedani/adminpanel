import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IPaymentMethodSingle } from 'src/app/interfaces/Ipayment_method';
import {  ISalaryTeacherUpdate, ITeacherSummery } from 'src/app/interfaces/ITeachersSalary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-pay-slip',
  templateUrl: './teacher-pay-slip.component.html',
})
export class TeacherPaySlipComponent implements OnInit {
  response : ITeacherSummery[]=[]
  math = Math;
  //currentDate= moment(new Date().toLocaleDateString(), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
  currentDate = moment().format('YYYY-MM-DD')
  btnLoading: boolean = false
  shabaList: IPaymentMethodSingle[] = []
  ReportForm: FormGroup
  @Input() subcourse_id: string
  @Input() user_id:string
  private readonly router=inject(Router)
  private readonly alertServices=inject(AlertifyService)
  constructor(private http:HttpService) {
    this.ReportForm = new FormGroup({
      rewards_earning: new FormControl('', [Validators.required]),
      punishment_deductions: new FormControl('', [Validators.required]),
      loan_installment: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
      payment_date: new FormControl('', [Validators.required])
    })

  }
  ngOnInit(): void {
    this.response= this.http.getData()
    this.getShabaList()
  }
  getShabaList(){
    this.http.getAll(`${Domain.GetPaymentMethodData}/${this.user_id}?user=true`).subscribe((response) => {
      this.shabaList=response
    })
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISalaryTeacherUpdate =
    {
      rewards_earning: this.ReportForm.controls.rewards_earning.value.replace(/,/g, ""),
      punishment_deductions: this.ReportForm.controls.punishment_deductions.value.replace(/,/g, ""),
      loan_installment: this.ReportForm.controls.loan_installment.value.replace(/,/g, ""),
      payment_date: moment.from(this.ReportForm.controls.payment_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      payment: this.ReportForm.controls.payment.value,
    }
    this.http.put(`${Domain.PutSalaryTeachertUpdate}/${this.subcourse_id}`, ReportFormValue, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("با موفقیت اپدیت شد");
      this.ReportForm.reset();
      window.print()
    }
    )
    this.btnLoading = false
  }
  // ngOnDestroy():void {
  //   this.subscription.unsubscribe();
  // }
}






