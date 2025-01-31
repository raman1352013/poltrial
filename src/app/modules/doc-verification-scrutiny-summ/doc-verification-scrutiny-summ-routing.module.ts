import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationScrutinySummComponent } from '../../views/doc-verification-scrutiny-summ/doc-verification-scrutiny-summ.component';

const routes: Routes = [
  { path: '', component: DocVerificationScrutinySummComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationScrutinySummRoutingModule { }
