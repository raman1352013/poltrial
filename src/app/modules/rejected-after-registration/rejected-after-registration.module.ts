import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejectedAfterRegistrationRoutingModule } from './rejected-after-registration-routing.module';
import { RejectedAfterRegistrationComponent } from '../../views/rejected-after-registration/rejected-after-registration.component';
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
    RejectedAfterRegistrationRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    RejectedAfterRegistrationComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class RejectedAfterRegistrationModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
