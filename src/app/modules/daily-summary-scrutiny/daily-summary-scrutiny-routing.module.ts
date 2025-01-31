import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyComponent } from '../../views/daily-summary-scrutiny/daily-summary-scrutiny.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyRoutingModule { }
