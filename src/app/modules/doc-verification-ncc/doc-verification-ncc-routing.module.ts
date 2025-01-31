import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocVerificationNccComponent } from '../../views/doc-verification-ncc/doc-verification-ncc.component';

const routes: Routes = [
  { path: '', component:DocVerificationNccComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationNccRoutingModule { }
