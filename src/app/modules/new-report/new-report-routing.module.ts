import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewReportComponent } from '../../views/new-report/new-report.component'

const routes: Routes = [
  { path: '', component: NewReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewReportRoutingModule { }
