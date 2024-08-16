import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-absent',
  templateUrl: './teacher-absent.component.html',
})
export class TeacherAbsentComponent {
  @Input() subcourse_id:string
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف"," تاریخ جلسه","  حضور و غیاب زبان آموزان","وضعیت"]
}
