import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TicketsComponent,MyTicketsComponent,TicketAddComponent,TicketDetailsComponent],
  imports: [
    CommonModule,
    SupportRoutingModule,
    NgPersianDatepickerModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
  ]
})
export class SupportModule { }
