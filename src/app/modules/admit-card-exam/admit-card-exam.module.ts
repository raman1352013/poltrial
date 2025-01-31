import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmitCardExamRoutingModule } from './admit-card-exam-routing.module';
import { AdmitCardExamComponent } from '../../views/admit-card-exam/admit-card-exam.component';
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
    AdmitCardExamRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AdmitCardExamComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class AdmitCardExamModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
