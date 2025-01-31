import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighJumpRoutingModule } from './high-jump-routing.module';
import { HighJumpComponent } from '../../views/high-jump/high-jump.component';
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
    HighJumpRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    HighJumpComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class HighJumpModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
