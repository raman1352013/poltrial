import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from '../../views/user-details/user-details.component'; import { SharedModule } from '../shared/shared.module';
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
    UserDetailsRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    UserDetailsComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class UserDetailsModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
