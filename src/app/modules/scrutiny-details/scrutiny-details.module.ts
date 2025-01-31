import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrutinyDetailsRoutingModule } from './scrutiny-details-routing.module';
import { ScrutinyDetailsComponent } from '../../views/scrutiny-details/scrutiny-details.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { NgQrScannerModule } from 'angular2-qrscanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    ScrutinyDetailsRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ScrutinyDetailsComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class ScrutinyDetailsModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
