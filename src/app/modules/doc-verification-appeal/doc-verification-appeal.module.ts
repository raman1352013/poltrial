import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationAppealRoutingModule } from './doc-verification-appeal-routing.module';
import { DocVerificationAppealComponent } from '../../views/doc-verification-appeal/doc-verification-appeal.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    DocVerificationAppealRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
    DocVerificationAppealComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationAppealModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
