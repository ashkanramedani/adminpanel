import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaymentMethodSingle } from 'src/app/interfaces/Ipayment_method';
import { ISalaryReceiptReport } from 'src/app/interfaces/ISalaryReceiptReport';

@Component({
  selector: 'app-teacher-pay-slip',
  templateUrl: './teacher-pay-slip.component.html',
})
export class TeacherPaySlipComponent {
responseData= {} as ISalaryReceiptReport
math = Math;
currentDate=new Date().toLocaleDateString()
shabaList:IPaymentMethodSingle[]=[]
ReportForm:FormGroup
constructor(){
  this.ReportForm = new FormGroup({
    rewards_earning: new FormControl('', [Validators.required]),
    punishment_deductions: new FormControl('', [Validators.required]),
    loan_installment: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
    payment_date: new FormControl('', [Validators.required])
  })
}
}
