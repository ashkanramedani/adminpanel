import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Domain } from 'src/app/domain/doamin';
import { ITeacherDelay } from 'src/app/interfaces/ITeacherDelay';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teachers-delay',
  templateUrl: './teachers-delay.component.html',
  styleUrl: './teachers-delay.component.css'
})
export class TeachersDelayComponent implements OnInit {

  ResponseDataList: ITeacherDelay[] = []
  ResponseDataLenght: number[];
  totalCount:number=0
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  // page:number=1
  // limit:number=10
  currentPage:number=1
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?table=Tardy Request`).subscribe((response)=>
    {
      this.totalCount=response
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number) {
    this.isLoading=true;
    this.currentPage=page;
    this.http.getAll(`${Domain.GetTeachersDelay}?page=${page}&limit=${limit}&order=desc`).subscribe((response) => {
      this.ResponseDataList=response;
      this.isLoading=false
    })
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  RemoveItem(id?: number) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
        .deleteWithQuery(`${Domain.DeleteTeachersDelay}?form_id=${id}`)
          .subscribe((response) => {
            console.log(response);
          });
        this.GetResponseData(1,10);
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => { }
    );
  }

  ShowTitleStatus(status: Number) {
    var title = "";
    var classStatus = "";
    switch (status) {
      case 0:
        title = "غیر فعال"
        classStatus = "inline-flex rounded-full bg-[#637381] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      case 1:
        title = "تایید نشده "
        classStatus = "inline-flex rounded-full bg-[#3BA2B8] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      case 2:
        title = " فعال "
        classStatus = "inline-flex rounded-full bg-[#3CA745] px-2 py-1 text-xs font-medium text-white hover:bg-opacity-90"
        break;
      default:
        title = "نامشخص"
        break;
    }
    return { title: title, classStatus: classStatus }
  }
}
