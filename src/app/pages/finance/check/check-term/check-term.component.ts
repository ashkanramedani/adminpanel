import { Component } from '@angular/core';

@Component({
  selector: 'app-check-term',
  templateUrl: './check-term.component.html',
})
export class CheckTermComponent {
  bntActive:boolean=false
  accept(){ 
    this.bntActive=!this.bntActive;
  }
}
