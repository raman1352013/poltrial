import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitCardComponent } from '../../views/admit-card/admit-card.component';

const routes: Routes = [
  { path: '', component: AdmitCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmitCardRoutingModule { }
