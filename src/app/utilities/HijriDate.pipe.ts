import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'HijriDate'
})
export class HijriDatePipe implements PipeTransform {

  transform(date:string): string {
    if (!date)  return "";
    return ( moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'))
   }
}
