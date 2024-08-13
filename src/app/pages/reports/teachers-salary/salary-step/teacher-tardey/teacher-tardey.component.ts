import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-tardey',
  templateUrl: './teacher-tardey.component.html', 
})
export class TeacherTardeyComponent {
  isloading:boolean=false
  responseData:any=[]
  table_header:string[]=["ردیف"," تاریخ تاخیر","  مدت زمان تاخیر","وضعیت"]
}
