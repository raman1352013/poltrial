import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceComponent } from '../../views/race/race.component';

const routes: Routes = [
  { path: '', component: RaceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceRoutingModule { }
