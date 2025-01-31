import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
    // this.router.navigateByUrl('/Login')

  }

  public dismiss() {
    this.activeModal.close();
  }


}
