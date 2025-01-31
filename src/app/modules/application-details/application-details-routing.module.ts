import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from '../../views/application-details/application-details.component';

const routes: Routes = [
  { path: '', component: ApplicationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationDetailsRoutingModule { }
