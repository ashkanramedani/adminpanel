
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { IProfessorsReports } from 'src/app/interfaces/IProfessorsReports';
import { IReportEmployee } from 'src/app/interfaces/IReportEmployee';

@Component({
  selector: 'app-professors-reports',
  templateUrl: './professors-reports.component.html',
})
export class ProfessorsReportsComponent implements OnInit {
  //#region change this information

  form_title: string = "گزارشات/ مالی /   محاسبات حقوقی پرسنل"
  AuditForm: IRolesForm
  table_header: string[] = ["پرسنل", " موقعیت ", "وضعیت "]
  ResponseDataList: IReportEmployee[] = []
  //#endregion
  order: string = "desc"
  currentPage: number = 1
  ResponseDataLenght: number[];
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  isShowenAlert: boolean = false
  year: number
  month: number
  constructor(private http: HttpService, private route: ActivatedRoute, private router:Router,private formBuilder: FormBuilder, private alertServices: AlertifyService) {

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
    let ReportFormValue: IProfessorsReports =
    {
      year: this.ReportForm.controls.year.value,
      month: this.ReportForm.controls.month.value,
    }
    this.http.create(Domain.PostProfessorsReports, ReportFormValue, null).subscribe((response) => {
      console.log(response)
      this.ResponseDataList = response
      this.year = this.ReportForm.controls.year.value,
        this.month = this.ReportForm.controls.month.value,
        this.isShowenAlert = true
      this.ReportForm.reset();
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
    this.router.navigate(['/reports/professorsreport/'+user_id], { queryParams: { step: "1",year:this.year,month:this.month}})
    // this.http.getAll(`${Domain.GetSalaryEmployee}/${user_id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
    //   console.log(response)
    // })
  }
}

