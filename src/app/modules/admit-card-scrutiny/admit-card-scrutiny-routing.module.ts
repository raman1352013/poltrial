import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitCardScrutinyComponent } from '../../views/admit-card-scrutiny/admit-card-scrutiny.component';

const routes: Routes = [
  { path: '', component: AdmitCardScrutinyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmitCardScrutinyRoutingModule { }
