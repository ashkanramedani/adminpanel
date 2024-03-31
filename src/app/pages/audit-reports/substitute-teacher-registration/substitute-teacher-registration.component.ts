import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ISubstituteTeacher } from 'src/app/interfaces/ISubstituteTeacher';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-substitute-teacher-registration',
  templateUrl: './substitute-teacher-registration.component.html',
  styleUrl: './substitute-teacher-registration.component.css'
})
export class SubstituteTeacherRegistrationComponent implements OnInit {

  ResponseDataList: ISubstituteTeacher[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  IsShowenModal: boolean = false
  SingleData:ISubstituteTeacher
  order:string="desc"
  selected_response_ids: number[] = [];
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10.,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?table=Teacher Replacement`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
  GetResponseData(page:number,limit:number,order:string) {
    this.http.getAll(`${Domain.GetSubstituteTeacher}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      console.log(response)
      this.ResponseDataList=response;
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
          .deleteWithQuery(`${Domain.DeleteSubstituteTeacher}?form_id=${id}`)
          .subscribe((response) => {
            console.log(response);
          });
        this.GetResponseData(1,10,this.order);
        this.alertServices.success('آیتم با موفقیت حذف شد');
      },
      () => { }
    );
  }

  checkToDeletedCheckBox(event: any, id: number) {
    if (event?.target.checked) {
      this.selected_response_ids.push(id);
    } else {
      let index = this.selected_response_ids.indexOf(id);
      this.selected_response_ids.splice(index, 1);
    }
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
  ChangeStatusMultiItem(event: any) {
    if (this.selected_response_ids.length > 0) {
      let items_to_changed_status: { post_pk_id: Number, post_status: Number }[] = [];
      for (let index = 0; index < this.selected_response_ids.length; index++) {
        items_to_changed_status.push({
          post_pk_id: this.selected_response_ids[index],
          post_status: event.target.value
        })
      }
      this.alertServices.confirm(
        ' تغییر وضعیت آیتم ها',
        'آیا از تغییر وضعیت این آیتم ها اطمینان دارید؟',
        () => {
          //TODO
          this.http
            .patch(
              `${Domain.ChangeGroupStatus}`,
              items_to_changed_status,
              null
            )
            .subscribe((response) => {
              console.log(response);
              if (response != null) {
                this.GetResponseData(1,10,this.order);
                this.alertServices.success('آیتم ها با موفقیت تغییر وضعیت داده شدند');
                this.selected_response_ids = []
              }
            });
        },
        () => { }
      );
    } else this.alertServices.warning('آیتمی برای تغییر وضعیت انتخاب نشده است');
  }
  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(Domain.GetSingleSubstituteTeacher, id)
      .subscribe((response) => {
        this.SingleData = response;
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.created_fk_by).subscribe((emp)=>
        {
          this.SingleData.created_fk_by=emp.name + " "+emp.last_name
        })
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.teacher_fk_id).subscribe((teacher)=>
        {
          this.SingleData.teacher_fk_id=teacher.name + " "+teacher.last_name
        })
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.replacement_teacher_fk_id).subscribe((teacher)=>
        {
          this.SingleData.replacement_teacher_fk_id=teacher.name + " "+teacher.last_name
        })
        this.http.get(Domain.GetAuditClass,this.SingleData.class_fk_id).subscribe((cls) => {
          this.SingleData.class_fk_id=cls.name
        })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false
  }
}

