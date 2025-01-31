import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllowProvisionedComponent } from '../../views/allow-provisioned/allow-provisioned.component';

const routes: Routes = [
  { path: '', component: AllowProvisionedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllowProvisionedRoutingModule { }
