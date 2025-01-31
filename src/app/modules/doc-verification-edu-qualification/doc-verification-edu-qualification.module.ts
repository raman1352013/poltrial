import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocVerificationEduQualificationRoutingModule } from './doc-verification-edu-qualification-routing.module';
import { DocVerificationEduQualificationComponent } from '../../views/doc-verification-edu-qualification/doc-verification-edu-qualification.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    DocVerificationEduQualificationRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    ZXingScannerModule
  ],
  declarations: [
    DocVerificationEduQualificationComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class DocVerificationEduQualificationModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
