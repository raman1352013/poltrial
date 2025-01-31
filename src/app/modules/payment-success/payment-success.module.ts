import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSuccessRoutingModule } from './payment-success-routing.module';
import { PaymentSucessComponent } from '../../views/payment-sucess/payment-sucess.component';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    PaymentSuccessRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    PaymentSucessComponent,
  ]
})
export class PaymentSuccessModule { }
