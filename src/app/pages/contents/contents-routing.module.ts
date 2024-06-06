import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './contents.component';
import { ContentAddComponent } from './content-add/content-add.component';

const routes: Routes = [
  {
    path: '', component: ContentsComponent
  },
  { path: 'add', component: ContentAddComponent },
  { path: 'edit/:id', component: ContentAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
