import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../utilities/filter.pipe';
import { HijriDatePipe } from '../utilities/HijriDate.pipe';
@NgModule({
  declarations: [HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe]
})
export class SharedModule { }
