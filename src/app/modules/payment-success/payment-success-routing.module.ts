import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentSucessComponent } from '../../views/payment-sucess/payment-sucess.component';

const routes: Routes = [
  { path: "", component: PaymentSucessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSuccessRoutingModule { }
