import { Component, inject, Input } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { ITeacherTardyReport } from 'src/app/interfaces/ITeachersSalary';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-tardey',
  templateUrl: './teacher-tardey.component.html',
})
export class TeacherTardeyComponent {
  isloading:boolean=false
  table_header:string[]=["ردیف"," تاریخ تاخیر","  مدت زمان تاخیر","وضعیت"]
  responseData:ITeacherTardyReport[]=[]
  @Input() subcourse_id:string
  private readonly http=inject(HttpService)

  ngOnInit(): void {
    this.getResponseDate()
  }
  getResponseDate(){
    this.http.get(Domain.GetTardeyReport,this.subcourse_id ).subscribe((response)=>{
      this.responseData=response
    })
  }
}
