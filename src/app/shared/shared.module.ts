import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../utilities/filter.pipe';
import { HijriDatePipe } from '../utilities/HijriDate.pipe';
import { FloatingInputComponent } from './components/floating-input/floating-input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormatTimePipe } from '../utilities/format-time.pipe';
import { DayOfWeekPipe } from '../utilities/DayOfWeek.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DropDownUsersComponent } from './components/drop-down-users/drop-down-users.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [HeaderComponent, DropDownUsersComponent, BadgeComponent,LinkButtonComponent,SidebarComponent,PaginationComponent, FilterPipe, HijriDatePipe, FormatTimePipe, FloatingInputComponent, LoadingComponent, DayOfWeekPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [HeaderComponent,DropDownUsersComponent,LinkButtonComponent,BadgeComponent ,SidebarComponent,PaginationComponent, FilterPipe, HijriDatePipe, FormatTimePipe, FloatingInputComponent, LoadingComponent, DayOfWeekPipe]
})
export class SharedModule { }
