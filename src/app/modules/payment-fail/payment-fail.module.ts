import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentFailRoutingModule } from './payment-fail-routing.module';
import { PaymentFailComponent } from '../../views/payment-fail/payment-fail.component';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    PaymentFailRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    PaymentFailComponent,
  ]
})
export class PaymentFailModule { }
