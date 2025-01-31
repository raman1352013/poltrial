import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectedAfterRegistrationComponent } from '../../views/rejected-after-registration/rejected-after-registration.component';

const routes: Routes = [
  { path: '', component: RejectedAfterRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedAfterRegistrationRoutingModule { }
