import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredUserRoutingModule } from './registered-user-routing.module';
import { RegisteredUserComponent } from '../../views/registered-user/registered-user.component'
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
    RegisteredUserRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    RegisteredUserComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class RegisteredUserModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
