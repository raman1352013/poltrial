import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverFailRoutingModule } from './driver-fail-routing.module';
import { DriverFailComponent } from '../../views/driver-fail/driver-fail.component';
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
    DriverFailRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DriverFailComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DriverFailModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
