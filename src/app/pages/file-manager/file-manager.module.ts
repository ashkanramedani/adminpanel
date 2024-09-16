import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FilesComponent } from './files/files.component';
import { MinioService } from './services/minio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileDetailsComponent } from './file-details/file-details.component';


@NgModule({
  declarations: [FilesComponent,FileDetailsComponent],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class FileManagerModule { }
