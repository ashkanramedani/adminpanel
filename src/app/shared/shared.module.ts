import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../utilities/filter.pipe';
import { HijriDatePipe } from '../utilities/HijriDate.pipe';
import { FloatingInputComponent } from './floating-input/floating-input.component';
import { LoadingComponent } from './loading/loading.component';
import { FormatTimePipe } from '../utilities/format-time.pipe';
@NgModule({
  declarations: [HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe,FormatTimePipe,FloatingInputComponent,LoadingComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent,SidebarComponent,FilterPipe,HijriDatePipe,FormatTimePipe,FloatingInputComponent,LoadingComponent]
})
export class SharedModule { }
