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
import { DayOfWeekPipe } from '../utilities/DayOfWeek.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
@NgModule({
  declarations: [HeaderComponent, SidebarComponent,PaginationComponent, FilterPipe, HijriDatePipe, FormatTimePipe, FloatingInputComponent, LoadingComponent, DayOfWeekPipe],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [HeaderComponent, SidebarComponent,PaginationComponent, FilterPipe, HijriDatePipe, FormatTimePipe, FloatingInputComponent, LoadingComponent, DayOfWeekPipe]
})
export class SharedModule { }
