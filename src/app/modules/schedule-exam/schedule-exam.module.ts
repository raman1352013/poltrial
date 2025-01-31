import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleExamRoutingModule } from './schedule-exam-routing.module';
import { ScheduleExamComponent } from '../../views/schedule-exam/schedule-exam.component';
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
    ScheduleExamRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ScheduleExamComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class ScheduleExamModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
