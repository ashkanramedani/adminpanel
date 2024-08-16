import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IPaymentMethodSingle } from 'src/app/interfaces/Ipayment_method';
import { ISalaryEmployeeUpdate, ISalaryReceiptReport } from 'src/app/interfaces/ISalaryReceiptReport';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pay-slip-step',
  templateUrl: './pay-slip-step.component.html',
  providers: [DatePipe]
})
export class PaySlipStepComponent implements OnInit {
  math = Math;
  @Input() UserInfo = {} as IuserEditForm
  @Input() id: any
  @Input() year: number
  @Input() month: number
  ReportForm: FormGroup
  currentDate=moment().format('YYYY-MM-D');
  step: number
  btnLoading: boolean = false
  response_salary_receipt_report = {} as ISalaryReceiptReport
  shabaList:IPaymentMethodSingle[]=[]
  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute) {

    this.ReportForm = new FormGroup({
      rewards_earning: new FormControl('', [Validators.required]),
      punishment_deductions: new FormControl('', [Validators.required]),
      loan_installment: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
      payment_date: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

    this.GetSalaryEmployee()
    this.getShabaList()
    this.activateRoute.queryParams.subscribe((res) => {
      this.step = Number(res.step);
      console.log(res)
    });
  }
  getShabaList(){
    this.http.getAll(`${Domain.GetPaymentMethodData}/${this.id}?user=true`).subscribe((response) => {
      this.shabaList=response
    })
  }
  GetSalaryEmployee() {
    this.http.getAll(`${Domain.GetSalaryEmployee}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_salary_receipt_report = response
      console.log("salary receipt report response: ", response)
    })
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISalaryEmployeeUpdate =
    {
      rewards_earning: this.ReportForm.controls.rewards_earning.value.replace(/,/g, ""),
      punishment_deductions: this.ReportForm.controls.punishment_deductions.value.replace(/,/g, ""),
      loan_installment: this.ReportForm.controls.loan_installment.value.replace(/,/g, ""),
      payment_date: moment.from(this.ReportForm.controls.payment_date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      payment: this.ReportForm.controls.payment.value,
    }
    this.http.put(`${Domain.PutSalaryEmployeeUpdate}/${this.id}`, ReportFormValue, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("با موفقیت اپدیت شد");
      this.ReportForm.reset();
      window.print()
    }
    )
    this.btnLoading = false
  }

}
