import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DashboardModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
