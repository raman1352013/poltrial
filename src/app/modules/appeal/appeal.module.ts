import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealRoutingModule } from './appeal-routing.module';
import { AppealComponent } from '../../views/appeal/appeal.component';
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
    AppealRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    AppealComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class AppealModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
