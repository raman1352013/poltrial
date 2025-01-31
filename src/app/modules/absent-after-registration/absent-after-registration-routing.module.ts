import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsentAfterRegistrationComponent } from '../../views/absent-after-registration/absent-after-registration.component';

const routes: Routes = [
  { path: '', component: AbsentAfterRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsentAfterRegistrationRoutingModule { }
