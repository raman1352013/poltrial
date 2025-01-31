import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationDetailsRoutingModule } from './application-details-routing.module';
import { ApplicationDetailsComponent } from '../../views/application-details/application-details.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    ApplicationDetailsRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ApplicationDetailsComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class ApplicationDetailsModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
