import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { FileDetailsComponent } from './file-details/file-details.component';

const routes: Routes = [
  {path:'buckets',component:FilesComponent},
  {path:'bucket/:id',component:FileDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
