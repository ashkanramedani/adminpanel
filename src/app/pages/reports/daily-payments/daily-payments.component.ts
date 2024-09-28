import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployeesSalary } from 'src/app/interfaces/IEmployeesSalary';
import { IReportEmployee } from 'src/app/interfaces/IReportEmployee';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-daily-payments',
  templateUrl: './daily-payments.component.html',
})
export class DailyPaymentsComponent implements OnInit {
  //#region change this information

  form_title: string = "گزارشات/ حسابداری /   پرداختی های روزانه"
  table_header: string[] = ["ردیف", " نام دریافت کننده ", "شماره شبا ","مبلغ دریافتی","تاریخ دریافت"]
  ResponseDataList: IReportEmployee[] = []
  //#endregion
  order: string = "desc"
  currentPage: number = 1
  ResponseDataLenght: number[];
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  isShowenAlert: boolean = false
  year: number
  month: number
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.ReportForm = this.formBuilder.group(
      {
        date: new FormControl('',[Validators.required]),
      }
    )
    this.route.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.year =Number (res.year);
      this.month =Number(res.month);
    });
    if(this.year>0 && this.month>0)
    {
      let Value: any =
    {
      year: this.year,
      month: this.month,
    }
    this.ReportForm.controls["year"].patchValue(this.year);
    this.ReportForm.controls["month"].patchValue(this.month);
      this.http.create(Domain.PostEmployeesSalary, Value, null).subscribe((response) => {
        console.log(response)
        this.ResponseDataList = response

      })
    }
  }


  onSubmit() {
    this.isLoading=true
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IEmployeesSalary =
    {
      year: this.ReportForm.controls.year.value,
      month: this.ReportForm.controls.month.value,
    }
    this.http.create(Domain.PostEmployeesSalary, ReportFormValue, null).subscribe((response) => {
      console.log(response)
      this.ResponseDataList = response
      this.year = this.ReportForm.controls.year.value,
        this.month = this.ReportForm.controls.month.value,
        this.isShowenAlert = true

    }
    )
    this.isLoading=false
  }
}

