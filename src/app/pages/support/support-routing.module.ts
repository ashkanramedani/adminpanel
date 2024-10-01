import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

const routes: Routes = [
  {path:'tickets',component:TicketsComponent},
  {path:'ticket/:id',component:TicketDetailsComponent},
  {path:'ticket-add',component:TicketAddComponent},
  {path:'my-tickets',component:MyTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
