import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'n-badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent  {
  @Input() title: string
  setColor(title: string) {
    let color: string = ""
    switch (title) {
      case 'submitted':
        color = "!text-[#3498db]"
        break;
      case 'approved':
        color = "!text-[#2ecc71]"
        break;
      case 'rejected':
        color = "!text-[#e74c3c]"
        break;
      case 'pending':
        color = "!text-[#f39c12]"
        break;
      case 'cancelled':
        color = "!text-[#95a5a6]"
        break;
      case 'Deleted':
        color = "!text-[#34495e]"
        break;
      default:
        color = "!text-[#a3a3a3]"
        break;
    }
    return (color)
  }


}
