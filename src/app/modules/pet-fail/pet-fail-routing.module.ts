import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetFailComponent } from '../../views/pet-fail/pet-fail.component';

const routes: Routes = [
  { path: '', component: PetFailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetFailRoutingModule { }
