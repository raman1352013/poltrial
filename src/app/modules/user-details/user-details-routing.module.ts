import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from '../../views/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
