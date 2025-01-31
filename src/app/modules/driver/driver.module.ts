import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from '../../views/driver/driver.component'
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
    DriverRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DriverComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DriverModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
