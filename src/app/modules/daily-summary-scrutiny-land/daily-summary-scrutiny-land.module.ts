import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyLandRoutingModule } from './daily-summary-scrutiny-land-routing.module';
import { DailySummaryScrutinyLandComponent } from '../../views/daily-summary-scrutiny-land/daily-summary-scrutiny-land.component';
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
    DailySummaryScrutinyLandRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyLandComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyLandModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
