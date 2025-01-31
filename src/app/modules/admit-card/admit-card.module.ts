import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmitCardRoutingModule } from './admit-card-routing.module';
import { AdmitCardComponent } from '../../views/admit-card/admit-card.component';
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
    AdmitCardRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AdmitCardComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class AdmitCardModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
