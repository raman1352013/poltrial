import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyLandComponent } from '../../views/daily-summary-scrutiny-land/daily-summary-scrutiny-land.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyLandComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyLandRoutingModule { }
