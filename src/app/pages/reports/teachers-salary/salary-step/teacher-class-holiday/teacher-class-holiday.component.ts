import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-class-holiday',
  templateUrl: './teacher-class-holiday.component.html',
})
export class TeacherClassHolidayComponent {
  @Input() subcourse_id:string
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف","تاریخ جلسه در روزهای تعطیل","وضعیت"]
}
