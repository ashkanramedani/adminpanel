import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // transform(value: any, searchText: any): any {
  //   if (!searchText) { return value; }
  //   return value.filter((data: any) => this.matchValue(data, searchText));
  // }

  // matchValue(data: any, value: any) {
  //   return Object.keys(data).map((key) => {
  //     return new RegExp(value, 'gi').test(data[key]);
  //   }).some(result => result);
  // }


  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText)
        return items;
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
}