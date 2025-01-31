import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualProfileUpdateComponent } from '../../views/individual-profile-update/individual-profile-update.component';

const routes: Routes = [
  { path: '', component: IndividualProfileUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualProfileUpdateRoutingModule { }
