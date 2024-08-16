import { Component, inject, Input, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ITeacherCancellationReport } from 'src/app/interfaces/ITeachersSalary';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-cancellation',
  templateUrl: './teacher-cancellation.component.html',
})
export class TeacherCancellationComponent implements OnInit {

  isloading:boolean=false
  table_header:string[]=["ردیف","تاریخ کنسلی","توضیحات","وضعیت"]
  responseData:ITeacherCancellationReport[]=[]
  @Input() subcourse_id:string
  private readonly http=inject(HttpService)

  ngOnInit(): void {
    this.getResponseDate()
  }
  getResponseDate(){
    this.http.get(Domain.GetSessionCancellationReport,this.subcourse_id ).subscribe((response)=>{
      this.responseData=response
    })
  }
}
