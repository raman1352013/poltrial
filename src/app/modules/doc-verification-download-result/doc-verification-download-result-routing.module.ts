import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationDownloadResultComponent } from '../../views/doc-verification-download-result/doc-verification-download-result.component';

const routes: Routes = [
  { path: '', component: DocVerificationDownloadResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationDownloadResultRoutingModule { }
