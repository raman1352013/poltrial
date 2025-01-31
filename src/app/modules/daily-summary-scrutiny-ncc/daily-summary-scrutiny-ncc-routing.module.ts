import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyNccComponent } from '../../views/daily-summary-scrutiny-ncc/daily-summary-scrutiny-ncc.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyNccComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyNccRoutingModule { }
