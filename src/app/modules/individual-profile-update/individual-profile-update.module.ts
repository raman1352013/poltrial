import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualProfileUpdateRoutingModule } from './individual-profile-update-routing.module';
import { IndividualProfileUpdateComponent } from '../../views/individual-profile-update/individual-profile-update.component';
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
    IndividualProfileUpdateRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    IndividualProfileUpdateComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class IndividualProfileUpdateModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
