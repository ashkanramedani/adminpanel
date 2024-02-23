import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { RouterLink } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesUsersComponent } from './employees-users/employees-users.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContentsComponent,ContentAddComponent,EmployeesUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContentsRoutingModule,
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    CommonModule,
    RouterLink,
    CKEditorModule,
    SharedModule
  ]
})
export class ContentsModule { }
