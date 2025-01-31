import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReportRoutingModule } from './new-report-routing.module';
import { NewReportComponent } from '../../views/new-report/new-report.component'
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
    NewReportRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    NewReportComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class NewReportModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
