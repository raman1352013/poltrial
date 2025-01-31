import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisqualifyCandidateRoutingModule } from './disqualify-candidate-routing.module';
import { DisqualifyCandidateComponent } from '../../views/disqualify-candidate/disqualify-candidate.component';
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
    DisqualifyCandidateRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DisqualifyCandidateComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DisqualifyCandidateModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
