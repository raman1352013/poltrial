import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadJumpRoutingModule } from './broad-jump-routing.module';
import { BroadJumpComponent } from '../../views/broad-jump/broad-jump.component';
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
    BroadJumpRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    BroadJumpComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class BroadJumpModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
