import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationDownloadRowDataRoutingModule } from './doc-verification-download-row-data-routing.module';
import { DocVerificationDownloadRowDataComponent } from '../../views/doc-verification-download-row-data/doc-verification-download-row-data.component';
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
    DocVerificationDownloadRowDataRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    DocVerificationDownloadRowDataComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationDownloadRowDataModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
