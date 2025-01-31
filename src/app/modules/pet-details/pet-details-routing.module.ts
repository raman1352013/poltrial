import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetDetailsComponent } from '../../views/pet-details/pet-details.component';

const routes: Routes = [
  { path: '', component: PetDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetDetailsRoutingModule { }
