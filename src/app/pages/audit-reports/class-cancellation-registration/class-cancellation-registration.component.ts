
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IClassCancellation } from 'src/app/interfaces/IClassCancellation';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-class-cancellation-registration',
  templateUrl: './class-cancellation-registration.component.html',
  styleUrl: './class-cancellation-registration.component.css'
})
export class ClassCancellationRegistrationComponent implements OnInit {

  ResponseDataList: IClassCancellation[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?table=Class Cancellation`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number) {
    this.isLoading=true;
    this.http.getAll(`${Domain.GetClassCancellation}?page=${page}&limit=${limit}&order=desc`).subscribe((response) => {
      this.ResponseDataList=response;
      this.isLoading=false;
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
        .deleteWithQuery(`${Domain.DeleteClassCancellation}?form_id=${id}`)
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
