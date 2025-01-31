import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverFailComponent } from '../../views/driver-fail/driver-fail.component';

const routes: Routes = [
  { path: '', component: DriverFailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverFailRoutingModule { }
