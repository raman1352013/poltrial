import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutes } from './registration-routing.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from '../../views/registration/registration.component';
import { SharedModule } from '../shared/shared.module';
// import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    // ComponentsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    RegistrationComponent
  ]
})

export class RegistrationModule { }
