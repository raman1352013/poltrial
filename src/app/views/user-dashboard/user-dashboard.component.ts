import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PATTER_VALIDATION } from '../../app.constants';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApplicationService } from '../../services/application/application.service';
import { PaymentService } from '../../services/payment/payment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  @ViewChild('successPopUp') successPopUp;

  applicationForm: FormGroup;
  header = {
    title: 'Payment',
    button: false
  };
  save = true;
  payment = true;
  payFeeresponse: any;
  displayDeaderButton = true;
  closeResult;
  displayMainContent = false;
  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private paymentService: PaymentService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.applicationForm = new FormGroup({
      applicationNo: new FormControl(''),
      name: new FormControl(''),
      msisdn: new FormControl(''),
      email: new FormControl(''),
      district: new FormControl(''),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      postAppliedFor: new FormControl(''),
      applicationFee: new FormControl(''),
      covidFee: new FormControl(''),
      totalFee: new FormControl(''),
      referenceNo: new FormControl(''),
    });
    // this.openmd(this.successPopUp)
    this.payFee();
  }

  openmd(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'Go To Home') {
        this.displayMainContent = true;
        console.log('Submit')
        this.displayDeaderButton = true;
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  payFee() {
    this.applicationService.getApplication().then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.payFeeresponse = resp['body']['responseObject']
          // console.log("resp['body']['responseCode']", resp['body']['responseObject'])
          this.applicationForm.controls['applicationNo'].setValue(this.payFeeresponse.applicationNo);
          this.applicationForm.controls['name'].setValue(this.payFeeresponse.name);
          this.applicationForm.controls['msisdn'].setValue(this.payFeeresponse.mobileNo);
          this.applicationForm.controls['email'].setValue(this.payFeeresponse.email);
          this.applicationForm.controls['district'].setValue(this.payFeeresponse.district);
          this.applicationForm.controls['category'].setValue(this.payFeeresponse.category);
          this.applicationForm.controls['subCategory'].setValue(this.payFeeresponse.subCategory);
          this.applicationForm.controls['postAppliedFor'].setValue(this.payFeeresponse.postAppliedFor == 'G' ? 'General' : 'Driver');
          this.applicationForm.controls['applicationFee'].setValue(this.payFeeresponse.applicantionFee.applicationFee);
          this.applicationForm.controls['covidFee'].setValue(this.payFeeresponse.applicantionFee.covidFee);
          this.applicationForm.controls['totalFee'].setValue(this.payFeeresponse.applicantionFee.totalFee);
          this.applicationForm.controls['referenceNo'].setValue(this.payFeeresponse.txtId);
          this.applicationForm.disable();
        }
      }
    })
  }

}
