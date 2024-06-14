import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IBusinessTripReport } from 'src/app/interfaces/IBusinessTripReport';
import { IFingerScannerReport } from 'src/app/interfaces/IFingerScannerReport';
import { ILeaveRequestReport } from 'src/app/interfaces/ILeaveRequestReport';
import { ILibrary } from 'src/app/interfaces/ILibrary';
import { IRemoteRequest } from 'src/app/interfaces/IRemoteRequest';
import { IRemoteRequestReport } from 'src/app/interfaces/IRemoteRequestReport';
import { ISalaryReceiptReport } from 'src/app/interfaces/ISalaryReceiptReport';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-professorsreport-step',
  templateUrl: './professorsreport-step.component.html',
})
export class ProfessorsreportStepComponent implements OnInit {
  //#region change this informaion
  SingleData: ILibrary
  title: string = '';
  form_title: string = "گزارشات / مالی /   محاسبات حقوقی پرسنل"
  get_all_route: string = Domain.GetLibrary
  step: number
  delete_route: string = Domain.DeleteLibrary
  add_url: string = ""
  edit_url: string = ""
  table_header: string[] = []
  UserInfo: IuserEditForm

  response_fingerprint_report: IFingerScannerReport[] = []
  response_leave_request_report: ILeaveRequestReport[] = []
  response_business_trip_report: IBusinessTripReport[] = []
  response_remote_request_report: IRemoteRequestReport[] = []
  response_salary_receipt_report: ISalaryReceiptReport
  //#endregion
  ResponseDataLenght: number[];
  totalCount: number = 0
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  order: string = "desc"
  IsShowenModal: boolean = false
  page: number = 1
  limit: number = 10
  currentPage: number = 1
  id: any
  year: number
  month: number
  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot?.paramMap.get('id');
    this.GetUserInfo()
    this.activateRoute.queryParams.subscribe((res) => {
      console.log("res:", res)
      this.step = Number(res.step);
      this.year = res.year;
      this.month = res.month;
      this.ChangePage();
    });
  }
  GetUserInfo() {
    this.http.get(Domain.GetUsers, this.id).subscribe((response) => {
      this.UserInfo = response
      console.log("user:", response)
    })
  }
  PrintPage() {
    window.print()
  }
  ChangePage() {
    //ورود و خروج
    if (this.step == 1) {
      this.table_header = ["ردیف", " تاریخ ", "ساعت ورود  ", "ساعت خروج"]
      this.http.getAll(`${Domain.GetFingerScannerReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
        this.response_fingerprint_report = response
        console.log("fingerprint report response: ", response)
      })
    }

    //مرخصی
    else if (this.step == 2) {
      this.table_header = ["ردیف", " تاریخ مرخصی", " ثبت مرخصی ساعتی ", " ثبت مرخصی روزانه  ", " وضعیت"]
      this.http.getAll(`${Domain.GetLeaveRequestReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
        this.response_leave_request_report = response
        console.log("leave request response: ", response)
      })
    }
    //ماموریت
    else if (this.step == 3) {
      this.table_header = ["ردیف", " تاریخ شروع ماموریت", " تاریخ پایان ماموریت   ", "محل ماموریت", " وضعیت"]
      this.http.getAll(`${Domain.GetBusinessReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
        this.response_business_trip_report = response
        console.log("business trip response: ", response)
      })
    }
    //دورکاری
    else if (this.step == 4) {
      this.table_header = ["ردیف", " تاریخ شروع دورکاری", "   تاریخ پایان دورکاری ", " وضعیت"]
      this.http.getAll(`${Domain.GetRemoteRequestReport}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
        this.response_remote_request_report = response
        console.log("business trip response: ", response)
      })
    }
    //فیش حقوقی
    else if (this.step == 5) {
      this.http.getAll(`${Domain.GetSalaryEmployee}/${this.id}?year=${this.year}&month=${this.month}`).subscribe((response) => {
        this.response_salary_receipt_report = response
        console.log("salary receipt report response: ", response)
      })
    }

    else {
      this.router.navigate(['/notFound'])
    }
  }
  ChangeStatusBusinessTrip(id: string) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data={business_trip_id:ids}
    this.http.put(Domain.PutBusinessTripVerify, data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }
  ChangeStatusRemoteRequest(id: string) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data={remote_request_id:ids}
    this.http.put(Domain.PutRemoteRequestVerify, data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }
  GetResponseData(page: number, limit: number, order: string) {

  }

}

