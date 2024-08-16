import { Component, inject, Input } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ITeacherSubRequestReport } from 'src/app/interfaces/ITeachersSalary';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-sub-request',
  templateUrl: './teacher-sub-request.component.html',
})
export class TeacherSubRequestComponent {
  isloading:boolean=false
  table_header:string[]=["ردیف"," تاریخ جلسه"," استاد جایگزین","وضعیت"]
  responseData:ITeacherSubRequestReport[]=[]
  @Input() subcourse_id:string
  private readonly http=inject(HttpService)
  private readonly alertServices=inject(AlertifyService)

  ngOnInit(): void {
    this.getResponseDate()
  }
  getResponseDate(){
    this.http.get(Domain.GetSubRequestReport,this.subcourse_id ).subscribe((response)=>{
      this.responseData=response
    })
  }
  ChangeStatusLeaveRequest(id: string,event:any) {
    if (id == null) {
      this.alertServices.error("متاسفانه خطایی رخ داده است")
      return
    }
    let ids: Array<string> = [];
    ids.push(id)
    let data = { sub_request_pk_id: ids }
    this.http.put(` ${Domain.PutSubRequestVerify}/${event.target.value}` , data, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("تغییر وضعیت انجام شد")
    })
  }
}
