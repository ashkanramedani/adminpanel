import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsAddComponent } from './news-add/news-add.component';

const routes: Routes = [
  {
    path: '',component: NewsComponent},
   { path: 'add', component: NewsAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
