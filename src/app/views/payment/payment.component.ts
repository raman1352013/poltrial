import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PATTER_VALIDATION } from '../../app.constants';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApplicationService } from '../../services/application/application.service';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  applicationForm: FormGroup;
  header = {
    title: 'Payment',
    button: false
  };
  save = true;
  payment = false;
  payFeeresponse: any;
  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private paymentService: PaymentService,
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
      totalFee: new FormControl('')
    });

    this.payFee();
  }

  payFee() {
    this.applicationService.payFee().then((resp: any) => {
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
          this.applicationForm.disable();
          // this.updatePgId(this.payFeeresponse.txtId)
        }
      }
    })
  }

  updatePgId(txtId) {
    this.paymentService.updatePgId(txtId).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          console.log('Sucess')
        }
      }
    });
  }

  goToApplication() {
    // window.relo
    // window.location.reload();
    this.router.navigateByUrl('/Home');
  }


  // goToUrl() {
  //   const reqAmount = this.applicationForm.controls['totalFee'].value + '/1'
  //   this.paymentService.pgRequest(reqAmount).then((resp: any) => {
  //     if (resp.status == 200) {
  //       if (resp['body']['responseCode'] == 200) {
  //         console.log('Resp : ', resp)
  //       }
  //     }
  //   })
  // }

  goToUrl(): void {
    // this.document.location.href = 'https://stackoverflow.com';
    // tslint:disable-next-line:max-line-length
    window.location.href = this.payFeeresponse.paymentUrl;
    this.updatePgId(this.payFeeresponse.txtId)
  }
}
