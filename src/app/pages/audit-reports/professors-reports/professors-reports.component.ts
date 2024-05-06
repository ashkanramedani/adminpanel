  import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IProfessorsReports } from 'src/app/interfaces/IProfessorsReports';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { Ipayment_method } from 'src/app/interfaces/Ipayment_method';
import { Ipayment_methodForm } from 'src/app/interfaces/Ipayment_methodForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-professors-reports',
  templateUrl: './professors-reports.component.html',
})
export class ProfessorsReportsComponent implements OnInit {
  ReportForm: FormGroup;
  id: any;
  ResponseDataList: IProfessorsReports[] = []
  isLoading:boolean=false
  EmployiesData: IEmployees[] = []
  btnLoading: boolean = false
  AuditForm: Ipayment_methodForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        employee_id : new FormControl('', [Validators.required]),
        year: new FormControl('',[Validators.required]),
        month : new FormControl('',[Validators.required]),
      }
    )
  }


  onSubmit() {
    this.btnLoading = true
    this.isLoading=true
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    // let ReportFormValue: IProfessorsReports=
    // {
    //   employee_id : this.ReportForm.controls.employee_id.value,
    //     year:  this.ReportForm.controls.year.value,
    //     month : this.ReportForm.controls.month.value,

    // }
      this.btnLoading = true
      this.http.getAll(`${Domain.GetProfessorsReports}/${this.ReportForm.controls.employee_id.value}?year=${this.ReportForm.controls.year.value}&month=${this.ReportForm.controls.month.value}`, null).subscribe((response) => {
        console.log(response)
          // this.alertServices.success("با موفقیت اضافه شد");
          // this.ReportForm.reset();
          // this.btnLoading = false
      }
      )
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
}

