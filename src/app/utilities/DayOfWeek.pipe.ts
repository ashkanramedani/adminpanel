import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(day: number): string {
    let day_title: string = ""
    switch (day) {
      case 0:
        day_title = "شنبه"
        break;
      case 1:
        day_title = "یکشنبه"
        break;
      case 2:
        day_title = "دوشنبه"
        break;
      case 3:
        day_title = "سه شنبه"
        break;
      case 4:
        day_title = "چهارشنبه"
        break;
      case 5:
        day_title = "پنجشنبه"
        break;
      case 6:
        day_title = "جمعه"
        break;
      default:
        day_title = "----"
        break;
    }
    return (day_title)
  }
}
