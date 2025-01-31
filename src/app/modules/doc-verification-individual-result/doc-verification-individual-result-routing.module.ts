import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationIndividualResultComponent } from '../../views/doc-verification-individual-result/doc-verification-individual-result.component';

const routes: Routes = [
  { path: '', component: DocVerificationIndividualResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationIndividualResultRoutingModule { }
