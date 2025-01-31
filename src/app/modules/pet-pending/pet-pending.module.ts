import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetPendingRoutingModule } from './pet-pending-routing.module';
import { PetPendingComponent } from '../../views/pet-pending/pet-pending.component';
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
    PetPendingRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PetPendingComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PetPendingModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
