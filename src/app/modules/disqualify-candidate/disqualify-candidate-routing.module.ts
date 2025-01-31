import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisqualifyCandidateComponent } from '../../views/disqualify-candidate/disqualify-candidate.component';

const routes: Routes = [
  { path: '', component: DisqualifyCandidateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisqualifyCandidateRoutingModule { }
