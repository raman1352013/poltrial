import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PstFailComponent } from '../../views/pst-fail/pst-fail.component';

const routes: Routes = [
  { path: '', component: PstFailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PstFailRoutingModule { }
