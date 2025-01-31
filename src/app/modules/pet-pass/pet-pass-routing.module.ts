import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetPassComponent } from '../../views/pet-pass/pet-pass.component';

const routes: Routes = [
  { path: '', component: PetPassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetPassRoutingModule { }
