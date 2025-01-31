import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PstPendingComponent } from '../../views/pst-pending/pst-pending.component';

const routes: Routes = [
  { path: '', component: PstPendingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PstPendingRoutingModule { }
