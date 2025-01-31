import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamDetailsComponent } from '../../views/exam-details/exam-details.component';

const routes: Routes = [
  { path: '', component: ExamDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamDetailsRoutingModule { }
