import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-cancellation',
  templateUrl: './teacher-cancellation.component.html',
})
export class TeacherCancellationComponent {
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف","تاریخ کنسلی","تاریخ جایگزین","توضیحات","وضعیت"]
}
