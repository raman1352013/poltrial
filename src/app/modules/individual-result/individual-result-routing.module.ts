import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualResultComponent } from '../../views/individual-result/individual-result.component';

const routes: Routes = [
  { path: '', component: IndividualResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualResultRoutingModule { }
