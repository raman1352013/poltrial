import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyRoutingModule } from './daily-summary-scrutiny-routing.module';
import { DailySummaryScrutinyComponent } from '../../views/daily-summary-scrutiny/daily-summary-scrutiny.component';
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
    DailySummaryScrutinyRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
