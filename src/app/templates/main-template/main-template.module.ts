import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTemplateRoutingModule } from './main-template-routing.module'; 
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainTemplateComponent } from './main-template.component';


@NgModule({
  declarations: [MainTemplateComponent],
  imports: [
    CommonModule,
    MainTemplateRoutingModule,
    SharedModule, RouterLink,
  ]
})
export class MainTemplateModule { }
