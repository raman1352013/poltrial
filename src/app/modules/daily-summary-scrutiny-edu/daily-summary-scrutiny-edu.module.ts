import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySummaryScrutinyEduRoutingModule } from './daily-summary-scrutiny-edu-routing.module';
import { DailySummaryScrutinyEduComponent } from '../../views/daily-summary-scrutiny-edu/daily-summary-scrutiny-edu.component';
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
    DailySummaryScrutinyEduRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DailySummaryScrutinyEduComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DailySummaryScrutinyEduModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
