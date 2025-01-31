import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyNccRoutingModule } from './daily-summary-scrutiny-ncc-routing.module';
import { DailySummaryScrutinyNccComponent } from '../../views/daily-summary-scrutiny-ncc/daily-summary-scrutiny-ncc.component';
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
    DailySummaryScrutinyNccRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyNccComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyNccModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
