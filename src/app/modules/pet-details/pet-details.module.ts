import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetDetailsRoutingModule } from './pet-details-routing.module';
import { PetDetailsComponent } from '../../views/pet-details/pet-details.component';
import { SharedModule } from '../shared/shared.module';
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
    PetDetailsRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PetDetailsComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PetDetailsModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
