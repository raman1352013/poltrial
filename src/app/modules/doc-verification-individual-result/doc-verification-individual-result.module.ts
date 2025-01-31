import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationIndividualResultRoutingModule } from './doc-verification-individual-result-routing.module';
import { DocVerificationIndividualResultComponent } from '../../views/doc-verification-individual-result/doc-verification-individual-result.component';
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
    DocVerificationIndividualResultRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
    DocVerificationIndividualResultComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationIndividualResultModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
