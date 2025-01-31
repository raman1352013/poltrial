import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationLmvComponent } from '../../views/doc-verification-lmv/doc-verification-lmv.component';

const routes: Routes = [
  { path: '', component: DocVerificationLmvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationLmvRoutingModule { }
