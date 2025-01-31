import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HighJumpComponent } from '../../views/high-jump/high-jump.component';

const routes: Routes = [
  { path: '', component: HighJumpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighJumpRoutingModule { }
