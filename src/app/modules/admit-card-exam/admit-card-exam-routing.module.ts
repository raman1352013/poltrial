import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitCardExamComponent } from '../../views/admit-card-exam/admit-card-exam.component';

const routes: Routes = [
  { path: '', component: AdmitCardExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmitCardExamRoutingModule { }
