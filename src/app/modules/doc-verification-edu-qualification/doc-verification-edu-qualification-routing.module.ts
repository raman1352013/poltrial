import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocVerificationEduQualificationComponent } from '../../views/doc-verification-edu-qualification/doc-verification-edu-qualification.component';

const routes: Routes = [
  { path: '', component: DocVerificationEduQualificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocVerificationEduQualificationRoutingModule { }
