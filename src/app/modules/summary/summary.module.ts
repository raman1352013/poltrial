import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from '../../views/summary/summary.component';
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
    SummaryRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    SummaryComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class SummaryModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
