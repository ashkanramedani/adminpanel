import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesRoutingModule } from './libraries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { RouterLink } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LibrariesComponent } from './libraries.component';
import { LibrariesAddComponent } from './libraries-add/libraries-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [LibrariesComponent,LibrariesAddComponent],
  imports: [
    CommonModule,
    LibrariesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    CommonModule,
    RouterLink,
    CKEditorModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class LibrariesModule { }
