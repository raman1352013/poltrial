import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationBackwardAreaRoutingModule } from './doc-verification-backward-area-routing.module';
import { DocVerificationBackwardAreaComponent } from '../../views/doc-verification-backward-area/doc-verification-backward-area.component';
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
    DocVerificationBackwardAreaRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
    DocVerificationBackwardAreaComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationBackwardAreaModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
