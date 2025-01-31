import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverPassRoutingModule } from './driver-pass-routing.module';
import { DriverPassComponent } from '../../views/driver-pass/driver-pass.component';
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
    DriverPassRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DriverPassComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DriverPassModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
