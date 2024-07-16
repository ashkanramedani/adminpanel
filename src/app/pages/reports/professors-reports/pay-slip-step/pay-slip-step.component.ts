import { Component, Input, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISalaryReceiptReport } from 'src/app/interfaces/ISalaryReceiptReport';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pay-slip-step',
  templateUrl: './pay-slip-step.component.html',
})
export class PaySlipStepComponent implements OnInit {
  @Input() UserInfo={} as IuserEditForm
  @Input() id: any
  @Input() year: number
  @Input() month: number
  response_salary_receipt_report: ISalaryReceiptReport

  constructor(private http: HttpService, private alertServices: AlertifyService) { }

  ngOnInit(): void {
   this.GetSalaryEmployee()
  }
  GetSalaryEmployee()
  {
    this.http.getAll(`${Domain.GetSalaryEmployee}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
      this.response_salary_receipt_report = response
      console.log("salary receipt report response: ", response)
    })
  }
}
