import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from '../../views/attendance/attendance.component';
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
    AttendanceRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    AttendanceComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class AttendanceModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
