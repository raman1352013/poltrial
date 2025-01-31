import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocumentRoutingModule } from './upload-document-routing.module';
import { UploadDocumentComponent } from '../../views/upload-document/upload-document.component';
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
    UploadDocumentRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,
    ZXingScannerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    UploadDocumentComponent,
    // DataFilterPipe,
  ],
  providers: [],
})
export class UploadDocumenteModule {
  constructor() {
    //this.commonService.showHead.next(true);
  }
}
