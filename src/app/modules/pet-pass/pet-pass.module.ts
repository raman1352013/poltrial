import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetPassRoutingModule } from './pet-pass-routing.module';
import { PetPassComponent } from '../../views/pet-pass/pet-pass.component';
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
    PetPassRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    PetPassComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class PetPassModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
