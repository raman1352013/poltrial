import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualResultRoutingModule } from './individual-result-routing.module';
import { IndividualResultComponent } from '../../views/individual-result/individual-result.component';
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
    IndividualResultRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    IndividualResultComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class IndividualResultModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
