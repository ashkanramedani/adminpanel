import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { BlogsAddComponent } from './blogs-add/blogs-add.component';

const routes: Routes = [
  {
    path:'', component:BlogsComponent
  },
  {path:'add',component:BlogsAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
