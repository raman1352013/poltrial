import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PstFailRoutingModule } from './pst-fail-routing.module';
import { PstFailComponent } from '../../views/pst-fail/pst-fail.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    PstFailRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PstFailComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PstFailModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
