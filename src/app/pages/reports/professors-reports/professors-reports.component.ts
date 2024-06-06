
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { ITardeyRequest } from 'src/app/interfaces/ITardeyRequest';

@Component({
  selector: 'app-professors-reports',
  templateUrl: './professors-reports.component.html',
})
export class ProfessorsReportsComponent implements OnInit {
  //#region change this information

  form_title:string="گزارشات/ مالی /   محاسبات حقوقی پرسنل"
  AuditForm: IRolesForm
  table_header: string[] = ["پرسنل", " موقعیت ", "وضعیت "]
  ResponseDataList: ITardeyRequest[] = []
  get_all_route:string=Domain.GetTardeyRequest
  //#endregion
  order: string = "desc"
  currentPage: number = 1
  ResponseDataLenght: number[];
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        year: new FormControl('',[Validators.required]),
        month : new FormControl('',[Validators.required]),
      }
    )

  }

  GetResponseData(page: number, limit: number, order: string) {
    this.isLoading = true;
    this.currentPage = page;
    this.http.getAll(`${this.get_all_route}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response;
      this.currentPage = page
      this.isLoading = false
      console.log(response)
    })
  }

  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }

  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    // let ReportFormValue: IRolesForm =
    // {
    //   role_pk_id:this.id,
    //   created_fk_by: this.ReportForm.controls.created_fk_by.value,
    //   description: this.ReportForm.controls.description.value,
    //   status: this.ReportForm.controls.status.value,
    //   name: this.ReportForm.controls.name.value,
    //   cluster: this.ReportForm.controls.cluster.value,

    // }
    this.http.getAll(`${Domain.GetProfessorsReports}/${this.ReportForm.controls.employee_id.value}?year=${this.ReportForm.controls.year.value}&month=${this.ReportForm.controls.month.value}`, null).subscribe((response) => {
      console.log(response)
        // this.alertServices.success("با موفقیت اضافه شد");
        // this.ReportForm.reset();
         this.btnLoading = false
    } )
  }
}

