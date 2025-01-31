import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationDownloadRowDataComponent } from '../../views/doc-verification-download-row-data/doc-verification-download-row-data.component';

const routes: Routes = [
  { path: '', component: DocVerificationDownloadRowDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationDownloadRowDataRoutingModule { }
