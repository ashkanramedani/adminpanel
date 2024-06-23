import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
})
export class TicketDetailsComponent {

  public editor:any = ClassicEditor;
}
