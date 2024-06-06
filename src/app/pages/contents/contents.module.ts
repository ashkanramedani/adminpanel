import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { RouterLink } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeesUsersComponent } from './employees-users/employees-users.component';


@NgModule({
  declarations: [ContentsComponent, ContentAddComponent,EmployeesUsersComponent],
  imports: [
    CommonModule,
    ContentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    CommonModule,
    RouterLink,
    CKEditorModule,
    SharedModule
  ]
})
export class ContentsModule { }
