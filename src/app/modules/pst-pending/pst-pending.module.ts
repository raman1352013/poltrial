import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PstPendingRoutingModule } from './pst-pending-routing.module';
import { PstPendingComponent } from '../../views/pst-pending/pst-pending.component';
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
    PstPendingRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PstPendingComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PstPendingModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
