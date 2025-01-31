import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master/master.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReportsService } from '../../services/reports/reports.service';
import { SharedService } from '../../services/shared/shared.service';
import { JsService } from '../../services/js/js.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../services/payment/payment.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  @ViewChild('keywordsInput') keywordsInput;
  searchForm: FormGroup;
  page = 1;
  itemsPerPage = 45;
  pageSize: any;

  districtList = [];
  summaryList = [];
  transationArray = [];
  submitSearchForm = false;
  disableDistrict = false;
  pageNumber = 0;

  paymentStatusList = [
    {
      name: 'Done',
      id: '4'
    }, {
      name: 'Not Done',
      id: '3'
    }
  ]
  genderList = [
    {
      name: 'Male',
      id: '2'
    }, {
      name: 'Female',
      id: '1'
    }
  ]
  postAppliedForList = [
    {
      name: 'Driver',
      id: 'D'
    }, {
      name: 'General Duty',
      id: 'G'
    }
  ];
  reqObj;
  closeResult: string;
  previousPage: number;

  constructor(
    private masterService: MasterService,
    private reportsService: ReportsService,
    private sharedService: SharedService,
    private jsService: JsService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.district();
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      let gender;
      let payment;
      let postAppliedFor;
      console.log('this.sharedService.getValue() ', this.sharedService.getValue())
      const districtId = this.sharedService.getValue() && this.sharedService.getValue().applicationInfo && this.sharedService.getValue().applicationInfo.districtId;
      if (this.sharedService.getValue() && this.sharedService.getValue().value == 'male') {
        gender = 2;
      } else if (this.sharedService.getValue() && this.sharedService.getValue().value == 'female') {
        gender = 1;
      } else {
        gender = null;
      }

      if (this.sharedService.getValue() && this.sharedService.getValue().value == 'payment') {
        payment = 4;
      } else if (this.sharedService.getValue() && this.sharedService.getValue().value == 'noPayment') {
        payment = 3;
      } else {
        payment = 4;
      }

      if (this.sharedService.getValue() && this.sharedService.getValue().value == 'driver') {
        postAppliedFor = 'D'
      } else if (this.sharedService.getValue() && this.sharedService.getValue().value == 'general') {
        postAppliedFor = 'G';
      } else {
        postAppliedFor = null;
      }

      this.reqObj = {
        msisdn: null,
        districtId: districtId || null,
        status: payment || null,
        gender: gender || null,
        postAppliedFor: postAppliedFor || null,
        applicationNumber: null,
        page: this.pageNumber
      }

      if (resp.id == 2) {
        this.sharedService.getLocalStorageItem('district').then((district: any) => {
          if (district) {
            this.searchForm.controls['districtId'].setValue(district.id);
            this.disableDistrict = true;
            this.reqObj.districtId = district.id;
            console.log('reqObj ', this.reqObj)
            if (this.sharedService.getValue()) {
              this.hitSearchApi(this.reqObj);
            }
          } else {
            this.summaryList = []
          }
        })
      } else {
        if (this.sharedService.getValue()) {
          this.hitSearchApi(this.reqObj);
        } else {
          this.summaryList = []
        }

        this.disableDistrict = false;
      }
    })
    this.checkRole()
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 3 && resp.id !== 2 && resp.id !== 14) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
          // this.sharedService.showWarning();
        }
      }
    });
  }

  initializeForm() {
    this.searchForm = new FormGroup({
      districtId: new FormControl(''),
      status: new FormControl(''),
      gender: new FormControl(''),
      msisdn: new FormControl(''),
      postAppliedFor: new FormControl(''),
      applicationNumber: new FormControl(''),
    });
    if (this.disableDistrict == true) {
      this.sharedService.getLocalStorageItem('district').then((district: any) => {
        if (district) {
          console.log('district ', district.id)
          this.searchForm.controls['districtId'].setValue(district.id);
        }
      })
    }
  }

  district() {
    this.masterService.districts(9).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.districtList = resp['body']['responseObject'];
        }
      }
    });
  }

  searchApplication() {
    this.pageNumber = 0;
    this.reqObj = {
      msisdn: this.searchForm.controls['msisdn'].value || null,
      districtId: this.searchForm.controls['districtId'].value || null,
      status: this.searchForm.controls['status'].value || null,
      gender: this.searchForm.controls['gender'].value || null,
      postAppliedFor: this.searchForm.controls['postAppliedFor'].value || null,
      applicationNumber: this.searchForm.controls['applicationNumber'].value || null,
      page: this.pageNumber
    }
    this.hitSearchApi(this.reqObj);
  }
  hitSearchApi(reqObj) {
    this.summaryList = [];
    this.search(reqObj)
  }

  search(reqObj) {
    console.log('hitSearchApi : ')
    this.reportsService.candidateDetails(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          const response = resp['body']['responseObject'];
          response.forEach(x => {
            let postAppliedForName;
            if (x.postAppliedFor == 'G') {
              postAppliedForName = 'General Duty'
            } else {
              postAppliedForName = 'Driver'
            }
            x.postAppliedForName = postAppliedForName;
            this.summaryList.push(x);
          });
          console.log('Response : ', resp['body']['responseObject'])
          this.initializeForm();
        } else {
          this.initializeForm();
          // this.pageNumber = 0;
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    })
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
    this.pageNumber = this.pageNumber + 1;
    this.reqObj.page = this.pageNumber;
    this.search(this.reqObj);
  }


  applicationPdfV2(applicationNo) {
    this.jsService.applicationPdfV2(applicationNo).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Application Form.pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })
  }

  viewBillingInfo(x) {
    console.log('X ', x)
    this.paymentService.getBillingData(x).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.transationArray = resp['body']['responseObject']
          this.open(this.keywordsInput)

          const response = resp['body']['responseObject'];
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    })

  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false

    }).result.then((result) => {
      console.log('Result: ', result)

      this.closeResult = `Closed with: ${result}`;
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




}
