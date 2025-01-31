import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsService } from '../../services/js/js.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @Input() headerTitle: any;
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatedDate: EventEmitter<any> = new EventEmitter<any>();
  @Input() save: any;
  @Input() payment: any;
  @Input() displayDeaderButton: any;
  login = true;
  selectedDate;
  // updatedDate;
  constructor(
    private jsService: JsService
  ) { }

  ngOnInit() {
  }

  checkinForm(bedBooking) {
    console.log(bedBooking);
    this.redirect.emit(bedBooking);
  }

  getDate(date) {
    // const modDate = date.split('-');

    this.updatedDate.emit(date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0]);
    console.log('DATE : ', date);
  }

  downloadReport() {
    this.jsService.applicationPdf().then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "report.pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })

    this.jsService.applicationPdf().then((resp: any) => {

    })
  }

}
