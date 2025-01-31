import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationScrutinySummRoutingModule } from './doc-verification-scrutiny-summ-routing.module';
import { DocVerificationScrutinySummComponent } from '../../views/doc-verification-scrutiny-summ/doc-verification-scrutiny-summ.component';
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
    DocVerificationScrutinySummRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    DocVerificationScrutinySummComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationScrutinySummModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
