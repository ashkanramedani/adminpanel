import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../utilities/filter.pipe';
import { HijriDatePipe } from '../utilities/HijriDate.pipe';
import { FloatingInputComponent } from './floating-input/floating-input.component';
@NgModule({
  declarations: [HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe,FloatingInputComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe,FloatingInputComponent]
})
export class SharedModule { }
