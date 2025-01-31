import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryComponent } from '../../views/daily-summary/daily-summary.component';

const routes: Routes = [
  { path: '', component: DailySummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryRoutingModule { }
