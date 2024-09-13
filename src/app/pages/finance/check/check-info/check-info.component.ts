import { Component } from '@angular/core';

@Component({
  selector: 'app-check-info',
  templateUrl: './check-info.component.html',
})
export class CheckInfoComponent {
  isOpenAdd: boolean = false

  openInsert() {
    this.isOpenAdd = !this.isOpenAdd
  }
}
