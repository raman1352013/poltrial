import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyLmvComponent } from '../../views/daily-summary-scrutiny-lmv/daily-summary-scrutiny-lmv.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyLmvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyLmvRoutingModule { }
