import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationAppealComponent } from '../../views/doc-verification-appeal/doc-verification-appeal.component';

const routes: Routes = [
  { path: '', component: DocVerificationAppealComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationAppealRoutingModule { }
