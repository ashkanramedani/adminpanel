import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HijriDate'
})
export class HijriDatePipe implements PipeTransform {

  transform(date:Date): string {
    if (!date)  return "";
    date=new  Date(date)
    alert(date);
    return ""
    //return (new Intl.DateTimeFormat('fa-IR').format(date));
   }
}
