import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisteredUserComponent } from '../../views/registered-user/registered-user.component'

const routes: Routes = [
  { path: '', component: RegisteredUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredUserRoutingModule { }
