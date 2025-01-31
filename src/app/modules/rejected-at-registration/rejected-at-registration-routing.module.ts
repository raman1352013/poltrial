import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectedAtRegistrationComponent } from '../../views/rejected-at-registration/rejected-at-registration.component';

const routes: Routes = [
  { path: '', component: RejectedAtRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedAtRegistrationRoutingModule { }
