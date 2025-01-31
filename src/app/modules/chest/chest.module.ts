import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChestRoutingModule } from './chest-routing.module';
import { ChestComponent } from '../../views/chest/chest.component';
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
    ChestRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ChestComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class ChestModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
