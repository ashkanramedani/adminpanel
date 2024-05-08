import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IQuestions } from 'src/app/interfaces/IQuestions';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {

  ResponseDataList: IQuestions[] = []
  ResponseDataLenght: number[];
  SearchValue: string
  isCheckedStatus: number;
  isLoading: boolean = true
  currentPage:number=1
  order:string="desc"
  SingleData:IQuestions
  IsShowenModal: boolean = false
  constructor(private http: HttpService, private alertServices: AlertifyService) { }
  ngOnInit(): void {
    this.GetResponseData(1,10,this.order)
    this.GetResponseDataLenght()
  }
  GetResponseDataLenght()
  {
    this.http.getAll(`${Domain.GetCount}?field=question`).subscribe((response)=>
    {
      this.ResponseDataLenght = new Array(Math.ceil(response / 10))
    })
  }
 
  GetResponseData(page:number,limit:number,order:string) {
    this.isLoading=true
    this.http.getAll(`${Domain.GetQuestionData}?page=${page}&limit=${limit}&order=${order}`).subscribe((response) => {
      this.ResponseDataList=response;
      this.currentPage=page
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
        .deleteWithQuery(`${Domain.DeleteQuestionData}/${id}`)
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
  OpenModal(id: string) {
    if (id == null) {
      alert("رکورد وجود ندارد")
      return;
    }
    this.http
      .get(Domain.GetQuestionData, id)
      .subscribe((response) => {
        this.SingleData = response;
        console.log(response)
        this.http.get(Domain.GetAuditEmplooyies, this.SingleData.created_fk_by).subscribe((emp)=>
        {
          console.log("emp: "+emp)
          this.SingleData.created_fk_by=emp.name + " "+emp.last_name
        })
        // this.http.get(Domain.GetAuditEmplooyies, this.SingleData.user_fk_id).subscribe((teacher)=>
        // {
        //   this.SingleData.user_fk_id=teacher.name + " "+teacher.last_name
        // })
        // this.http.get(Domain.GetAuditClass,this.SingleData.class_fk_id).subscribe((cls) => {
        //   this.SingleData.class_fk_id=cls.name
        // })
        this.IsShowenModal = true
      });
  }
  CloseModal() {
    this.IsShowenModal = false 
}
}

