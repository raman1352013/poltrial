import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetPendingComponent } from '../../views/pet-pending/pet-pending.component';

const routes: Routes = [
  { path: '', component: PetPendingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetPendingRoutingModule { }
