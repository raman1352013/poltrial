import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from '../../views/user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    SharedModule,
    NgbModule,
    // DataTableModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    UserDashboardComponent,
    DataFilterPipe
  ]
})
export class UserDashboardModule { }
