import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployeesSalary } from 'src/app/interfaces/IEmployeesSalary';
import { IReportEmployee } from 'src/app/interfaces/IReportEmployee';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employees-salary',
  templateUrl: './employees-salary.component.html', 
})
export class EmployeesSalaryComponent implements OnInit {
  //#region change this information

  form_title: string = "گزارشات/ مالی /   محاسبات حقوقی پرسنل"
  table_header: string[] = ["پرسنل", " موقعیت ", "وضعیت "]
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
  years: string[] = ['1401', '1402', '1403', '1404', '1405', '1406', '1407', '1408', '1409']
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.ReportForm = this.formBuilder.group(
      {
        year: new FormControl<number>(1403, [Validators.required]),
        month: new FormControl<number>(1, [Validators.required]),
      }
    )
  }


  onSubmit() {
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
  }
  SalaryCheck(user_id: string) {
    if (user_id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    // this.http.getAll(`${Domain.GetSalaryEmployee}/${user_id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
    //   console.log(response)
    // })
  }
  SalaryCalculation(user_id: string) {
    if (user_id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    this.http.get(Domain.GetSalaryPermision, user_id).subscribe((response) => {
      if (response.salary_Policy) {
        this.router.navigate(['/reports/professorsreport/' + user_id], { queryParams: { step: "1", year: this.year, month: this.month } })
      }
      else {
        this.alertServices.error(" برای این پرسنل قراردادی ثبت نشده است")
        return
      }
    })
  }
}
