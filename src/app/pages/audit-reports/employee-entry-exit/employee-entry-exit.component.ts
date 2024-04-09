
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IClassCancellation } from 'src/app/interfaces/IClassCancellation';
import { IEmployeeEntryExit } from 'src/app/interfaces/IEmployeeEntryExit';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employee-entry-exit',
  templateUrl: './employee-entry-exit.component.html',
  styleUrl: './employee-entry-exit.component.css'
})
export class EmployeeEntryExitComponent implements OnInit {

  ResponseDataList: IEmployeeEntryExit[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  IsShowenModal: boolean = false
  SingleData:IEmployeeEntryExit
  order:string="desc"
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?field=fingerprint_scanner`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number,order:string) {
    this.isLoading=true;
    this.http.getAll(`${Domain.GetEmployeeEntryExit}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList=response;
      console.log(response)
      this.isLoading=false;
    })
  }
  ChangeStatusCheckbox(event: any) {
    this.isCheckedStatus = event.target.value;
  }
  ChangeSort(value:any)
  {
    this.order=value.target.value
    this.GetResponseData(1,10,this.order);
  }
  RemoveItem(id?: number) {
    this.alertServices.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http
        .deleteWithQuery(`${Domain.DeleteEmployeeEntryExit}?form_id=${id}`)
        .subscribe((response) => {
          console.log(response);
          if (response == "Deleted") {
            this.GetResponseData(1, 10, this.order);
            this.alertServices.success('آیتم با موفقیت حذف شد');
          }
          else { this.alertServices.error('متاسفانه خطایی رخ داده است'); }
        });
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
  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(Domain.GetSingleClassCancellation, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetEmployeeEntryExit, this.SingleData.created_fk_by).subscribe((emp)=>
        {
          this.SingleData.created_fk_by=emp.name + " "+emp.last_name
        })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}
