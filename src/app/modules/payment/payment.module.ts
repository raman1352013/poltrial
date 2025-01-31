import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from '../../views/payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    PaymentComponent,
  ]
})
export class PaymentModule { }
