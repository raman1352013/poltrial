import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationRegComponent } from '../../views/doc-verification-reg/doc-verification-reg.component';

const routes: Routes = [
  { path: '', component: DocVerificationRegComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationRegRoutingModule { }
