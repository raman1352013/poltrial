import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyEduComponent } from '../../views/daily-summary-scrutiny-edu/daily-summary-scrutiny-edu.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyEduComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyEduRoutingModule { }
