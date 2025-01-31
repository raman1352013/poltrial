import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeightComponent } from '../../views/height/height.component';

const routes: Routes = [
  { path: '', component: HeightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeightRoutingModule { }
