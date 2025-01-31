import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
import { DailySummaryScrutinyNssComponent } from '../../views/daily-summary-scrutiny-nss/daily-summary-scrutiny-nss.component';

const routes: Routes = [
  { path: '', component: DailySummaryScrutinyNssComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryScrutinyNssRoutingModule { }
