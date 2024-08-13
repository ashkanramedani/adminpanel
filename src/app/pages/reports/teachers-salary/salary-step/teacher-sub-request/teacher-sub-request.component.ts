import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-sub-request',
  templateUrl: './teacher-sub-request.component.html', 
})
export class TeacherSubRequestComponent {
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف"," تاریخ جلسه"," استاد جایگزین","وضعیت"]
}
