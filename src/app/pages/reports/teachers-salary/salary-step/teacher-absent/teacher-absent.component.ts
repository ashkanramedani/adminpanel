import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-absent',
  templateUrl: './teacher-absent.component.html',
})
export class TeacherAbsentComponent {
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف"," تاریخ جلسه","  حضور و غیاب زبان آموزان","وضعیت"]
}
