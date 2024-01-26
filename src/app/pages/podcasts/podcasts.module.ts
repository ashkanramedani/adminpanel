import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastsRoutingModule } from './podcasts-routing.module';
import { PodcastAddComponent } from './podcast-add/podcast-add.component';
import { RouterLink } from '@angular/router';
import { PodcastsComponent } from './podcasts.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    PodcastAddComponent,
    PodcastsComponent
  ],
  imports: [
    CommonModule,
    PodcastsRoutingModule,
    RouterLink,
    CKEditorModule
  ]
})
export class PodcastsModule { }
