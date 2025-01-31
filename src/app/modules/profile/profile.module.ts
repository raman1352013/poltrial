import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '../../views/profile/profile.component';
// import { SharedModule } from '../shared/shared.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    // SharedModule
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
