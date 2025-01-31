import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationDownloadResultRoutingModule } from './doc-verification-download-result-routing.module';
import { DocVerificationDownloadResultComponent } from '../../views/doc-verification-download-result/doc-verification-download-result.component';
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
    DocVerificationDownloadResultRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    DocVerificationDownloadResultComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationDownloadResultModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
