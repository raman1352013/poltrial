import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmitCardScrutinyRoutingModule } from './admit-card-scrutiny-routing.module';
import { AdmitCardScrutinyComponent } from '../../views/admit-card-scrutiny/admit-card-scrutiny.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdmitCardScrutinyRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AdmitCardScrutinyComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class AdmitCardScrutinyModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
