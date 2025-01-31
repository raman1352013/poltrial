import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../../views/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
