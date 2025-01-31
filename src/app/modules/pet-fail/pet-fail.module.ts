import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFailRoutingModule } from './pet-fail-routing.module';
import { PetFailComponent } from '../../views/pet-fail/pet-fail.component';
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
    PetFailRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PetFailComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PetFailModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
