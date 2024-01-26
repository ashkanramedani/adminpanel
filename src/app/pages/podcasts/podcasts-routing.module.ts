import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastsComponent } from './podcasts.component';
import { PodcastAddComponent } from './podcast-add/podcast-add.component';

const routes: Routes = [
  {path:'',component:PodcastsComponent  },
  {path:'add',component:PodcastAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastsRoutingModule { }
