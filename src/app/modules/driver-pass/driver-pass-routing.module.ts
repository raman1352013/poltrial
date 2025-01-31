import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverPassComponent } from '../../views/driver-pass/driver-pass.component';

const routes: Routes = [
  { path: '', component: DriverPassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverPassRoutingModule { }
