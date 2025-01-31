import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocVerificationLmvRoutingModule } from './doc-verification-lmv-routing.module';
import {DocVerificationLmvComponent } from '../../views/doc-verification-lmv/doc-verification-lmv.component';
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
   DocVerificationLmvRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
   DocVerificationLmvComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationLmvModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
