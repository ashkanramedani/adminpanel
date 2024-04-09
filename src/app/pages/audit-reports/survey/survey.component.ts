import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISurvey } from 'src/app/interfaces/ISurvey';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit {

  ResponseDataList: ISurvey[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage: number = 1
  IsShowenModal: boolean = false
  SingleData: ISurvey
  order: string = "desc"
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1, 10, this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght() {
    this.http.getAll(`${Domain.GetCount}?field=survey`).subscribe((response) => {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  ChangeSort(value: any) {
    this.order = value.target.value
    this.GetResponseData(1, 10, this.order);
  }
  GetResponseData(page: number, limit: number, order: string) {
    this.isLoading = true
    this.http.getAll(`${Domain.GetSurvey}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList = response
      console.log(response)
      this.isLoading = false
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
          .deleteWithQuery(`${Domain.DeleteSurvey}?survey_id=${id}`)
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
      .get(Domain.GetSurvey, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.created_fk_by).subscribe((emp) => {
          this.SingleData.created_fk_by = emp.name + " " + emp.last_name
        })
        // this.http.get(Domain.GetAuditEmplooyies, this.SingleData.teacher_fk_id).subscribe((teacher)=>
        // {
        //   this.SingleData.teacher_fk_id=teacher.name + " "+teacher.last_name
        // })
        // this.http.get(Domain.GetAuditEmplooyies, this.SingleData.replacement_teacher_fk_id).subscribe((teacher)=>
        // {
        //   this.SingleData.replacement_teacher_fk_id=teacher.name + " "+teacher.last_name
        // })
        this.http.get(Domain.GetAuditClass, this.SingleData.class_fk_id).subscribe((cls) => {
          this.SingleData.class_fk_id = cls.name
        })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}

