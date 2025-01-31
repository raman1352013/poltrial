
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleExamComponent } from '../../views/schedule-exam/schedule-exam.component';

const routes: Routes = [
  { path: '', component: ScheduleExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleExamRoutingModule { }
