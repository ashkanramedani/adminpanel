import { NgModule } from '@angular/core';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';


@NgModule({
  declarations: [SigninComponent],
  imports: [
    SigninRoutingModule
  ]
})
export class SigninModule { }
