import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyLmvRoutingModule } from './daily-summary-scrutiny-lmv-scrutiny-routing.module';
import { DailySummaryScrutinyLmvComponent } from '../../views/daily-summary-scrutiny-lmv/daily-summary-scrutiny-lmv.component';
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
    DailySummaryScrutinyLmvRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyLmvComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyLmvModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
