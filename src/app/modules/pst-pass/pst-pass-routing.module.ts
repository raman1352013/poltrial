import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PstPassComponent } from '../../views/pst-pass/pst-pass.component';

const routes: Routes = [
  { path: '', component: PstPassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PstPassRoutingModule { }
