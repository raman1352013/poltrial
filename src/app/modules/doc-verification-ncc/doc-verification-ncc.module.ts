import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationNccRoutingModule } from './doc-verification-ncc-routing.module';
import { DocVerificationNccComponent } from '../../views/doc-verification-ncc/doc-verification-ncc.component';
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
    DocVerificationNccRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
    DocVerificationNccComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationNccModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
