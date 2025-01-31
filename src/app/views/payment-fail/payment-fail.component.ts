import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['./payment-fail.component.css']
})
export class PaymentFailComponent implements OnInit {
  @ViewChild('failPopUp') successPopUp;
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.openmd(this.successPopUp);
  }

  openmd(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'Go To Home') {
        // this.displayMainContent = true;
        console.log('Submit')
        // this.displayDeaderButton = true;
        this.router.navigateByUrl('/Payment')
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
