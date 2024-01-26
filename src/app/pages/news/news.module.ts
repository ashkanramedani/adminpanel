import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { RouterLink } from '@angular/router';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsComponent } from './news.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [NewsAddComponent,NewsComponent],
  imports: [
    CommonModule,
    RouterLink,
    NewsRoutingModule,
    CKEditorModule
  ]
})
export class NewsModule { }
