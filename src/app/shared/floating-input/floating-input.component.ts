import { Component, Input } from '@angular/core';

@Component({
  selector: 'floating-input',
  templateUrl: './floating-input.component.html',
})
export class FloatingInputComponent {
@Input() title:any;
}
