import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyNssRoutingModule } from './daily-summary-scrutiny-nss-routing.module';
import { DailySummaryScrutinyNssComponent } from '../../views/daily-summary-scrutiny-nss/daily-summary-scrutiny-nss.component';
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
    DailySummaryScrutinyNssRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyNssComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyNssModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
