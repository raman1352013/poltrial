import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDocumentComponent } from '../../views/upload-document/upload-document.component';

const routes: Routes = [
  { path: '', component: UploadDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDocumentRoutingModule { }
