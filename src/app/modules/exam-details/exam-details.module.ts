import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamDetailsRoutingModule } from './exam-details-routing.module';
import { ExamDetailsComponent } from '../../views/exam-details/exam-details.component';
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
    ExamDetailsRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ExamDetailsComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class ExamDetailsModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
