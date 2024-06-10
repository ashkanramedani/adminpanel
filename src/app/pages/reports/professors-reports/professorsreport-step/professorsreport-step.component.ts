import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { ILibrary } from 'src/app/interfaces/ILibrary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-professorsreport-step',
  templateUrl: './professorsreport-step.component.html',
})
export class ProfessorsreportStepComponent implements OnInit {
  //#region change this informaion
  ResponseDataList: ILibrary[] = []
  SingleData: ILibrary
  title: string = '';
  form_title: string = "گزارشات / مالی /   محاسبات حقوقی پرسنل"
  get_all_route: string = Domain.GetLibrary
  step: number
  delete_route: string = Domain.DeleteLibrary
  add_url: string = ""
  edit_url: string = ""
  table_header: string[] = []
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
  constructor(private http: HttpService, private alertServices: AlertifyService, private activateRoute: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((res) => {
      this.step = res.step;
      this.ChangePage();
      this.GetResponseData(1, 10, this.order)
    });

  }
  ChangePage() {
    if (this.step == 1) {
      this.table_header = ["ردیف", "روز هفته", " تاریخ ", "ساعت ورود  ", "ساعت خروج"]
    }
   else if (this.step == 2) {
      this.table_header = ["ردیف", " تاریخ مرخصی", " ثبت مرخصی ساعتی ", " ثبت مرخصی روزانه  ", " وضعیت"]
    }
    else if (this.step == 3) {
      this.table_header = ["ردیف", " تاریخ شروع ماموریت", " تاریخ پایان ماموریت   ", " ساعت شروع ماموریت ", "ساعت پایان ماموریت ", " وضعیت"]
    }
    else if (this.step == 4) {
      this.table_header = ["ردیف", " تاریخ شروع دورکاری", "   تاریخ پایان دورکاری ", "   ساعت شروع دورکاری  ","ساعت پایان دورکاری", " وضعیت"]
    }
    else if (this.step == 5) {

    }
    else{
      this.router.navigate(['/notFound'])
    }
  }

  GetResponseData(page: number, limit: number, order: string) {

  }

}

