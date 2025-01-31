import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrutinyDetailsComponent } from '../../views/scrutiny-details/scrutiny-details.component';

const routes: Routes = [
  { path: '', component: ScrutinyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrutinyDetailsRoutingModule { }
