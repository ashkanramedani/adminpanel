import { Component, Input } from '@angular/core';

@Component({
  selector: 'n-link-button',
  templateUrl: './link-button.component.html',
})
export class LinkButtonComponent {
@Input() link:string
@Input() title:string
}
