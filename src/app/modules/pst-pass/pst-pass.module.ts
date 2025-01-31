import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PstPassRoutingModule } from './pst-pass-routing.module';
import { PstPassComponent } from '../../views/pst-pass/pst-pass.component';
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
    PstPassRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PstPassComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PstPassModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
