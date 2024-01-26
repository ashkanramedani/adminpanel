import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsAddComponent } from './blogs-add/blogs-add.component';
import { RouterLink } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogsAddComponent,
    BlogsComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    CommonModule,
    BlogsRoutingModule,
    RouterLink,
    CKEditorModule
  ]
})
export class BlogsModule { }
