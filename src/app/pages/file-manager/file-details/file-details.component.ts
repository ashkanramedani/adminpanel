import { Component } from '@angular/core';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
})
export class FileDetailsComponent {

  IsShowenModal:boolean=false
  SearchValue:string
  table_header: string[] = ["نام", "تاریخ تغییر", " حجم فایل"]

  OpenModal() {
    this.IsShowenModal = !this.IsShowenModal
  }
}
