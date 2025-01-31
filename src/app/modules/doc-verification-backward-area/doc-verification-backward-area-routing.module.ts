import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationBackwardAreaComponent } from '../../views/doc-verification-backward-area/doc-verification-backward-area.component';

const routes: Routes = [
  { path: '', component: DocVerificationBackwardAreaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationBackwardAreaRoutingModule { }
