import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master/master.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { SharedService } from '../../services/shared/shared.service';
import { JsService } from '../../services/js/js.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../services/payment/payment.service';
import { SmsService } from '../../services/sms/sms.service';
import { t } from '@angular/core/src/render3';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
@ViewChild('attendanceRemarks') attendanceRemarks;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  // @ViewChild('attendanceRemarks') attendanceRemarks;
  searchForm: FormGroup;
  confirmationForm: FormGroup;
  downloadPdfForm: FormGroup;
  page = 1;
  itemsPerPage = 45;
  pageSize: any;

  districtList = [];
  summaryList = [];
  transationArray = [];
  submitSearchForm = false;
  disableDistrict = false;
  pageNumber = 0;
  minDate = "2021-11-01"
  venueList = [];
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
  submitApplicationForm = false;
  categoryList = [];
  subCategoryList: any;
  constructor(
    private masterService: MasterService,
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private jsService: JsService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private smsService: SmsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.district();
    this.initializeForm();
    // this.performInit();
    this.checkRole();
    this.getVenue();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 3 && resp.id !== 2) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
          // this.sharedService.showWarning();
        }
      }
    });
  }

  district() {
    this.masterService.districts(9).then((resp: any) => {
      if(resp.status == 200) {
        if(resp['body']['responseCode'] == 200) {
          this.districtList = resp['body']['responseObject']
        }
      }
    }) 
  }

  getVenue() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        this.masterService.examVenue(resp.id).then((resp: any) => {
          if(resp.status == 200) {
            if(resp['body']['responseCode'] == 200) {
              this.venueList = resp['body']['responseObject'];
            }
          }
        })
      }
    }); 
  }

  getCategory (id) { 
    this.masterService.category(id).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.categoryList = resp['body']['responseObject'];
        }
      }
    });
  }

  // getSelectedDistrict(event) {
  //   this.masterService.category(event).then((resp: any) => {
  //     if (resp.status === 200) {
  //       if (resp['body']['responseCode'] === 200) {
  //         this.categoryList = resp['body']['responseObject'];
  //       }
  //     }
  //   });
  // }

  getSelectedCategory(event) {
    // console.log("this.applicationForm.controls['gender'].value", this.applicationForm.controls['gender'].value)
    // console.log('selectedDistrict ', this.selectedDistrict)
    // if (this.selectedDistrict && this.applicationForm.controls['gender'].value) {
    const selectedDistrict = this.searchForm.controls['districtId'].value
    console.log('event ' , event)
    console.log('selectedDistrict ' , selectedDistrict)
      this.masterService.subCategory(selectedDistrict, event).then((resp: any) => {
        if (resp.status === 200) {
          if (resp['body']['responseCode'] === 200) {
            this.subCategoryList = resp['body']['responseObject']
          }
        }
      }) 
  }
  




  searchApplication() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      // console.log('this.sharedService.getValue() ', this.sharedService.getValue())
      let batchId;
      // if (this.sharedService.getValue()) {
      //   batchId = this.sharedService.getValue().batchId;
      //   // this.reqObj = {
      //   //   msisdn: null,
      //   //   districtId: null,
      //   //   gender: null,
      //   //   applicationNumber: null,
      //   //   batchId: this.sharedService.getValue().batchId,
      //   //   page: this.pageNumber
      //   // }
      // } else {
      //   batchId = null;
      // }
      this.reqObj = {
        msisdn: null,
        districtId: null,
        gender: null,
        applicationNumber: null,
        batchId: batchId,
        page: this.pageNumber
      };
      this.hitSearchApi(this.reqObj);
    });
  }

  initializeForm() {
    this.searchForm = new FormGroup({ 
      districtId: new FormControl(null, Validators.required),
      result: new FormControl(null, Validators.required), 
    });

    this.downloadPdfForm = new FormGroup({
      rollNoFrom: new FormControl(null, Validators.required),
      rollNoTo: new FormControl(null, Validators.required)
    })
    this.confirmationForm = new FormGroup({
      remarks: new FormControl('', Validators.required)
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

  hitSearchApi(reqObj) {
    this.summaryList = [];
    this.search(reqObj)
  }

  search(reqObj) {
    console.log('hitSearchApi : ')
    this.applicationService.candidatesExamScheduled(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          // this.initializeForm();
          const response = resp['body']['responseObject'];
          response.forEach(x => {
            let postAppliedForName;
            if (x.postAppliedFor == 'G') {
              postAppliedForName = 'General Duty'
            } else {
              postAppliedForName = 'Driver'
            }
            x.postAppliedForName = postAppliedForName;
            if (x.smsStatus == 'S') {
              x.smsStatus = 'Success'
            } else if (x.smsStatus == 'F') {
              x.smsStatus = 'Fail'
            } else {
              x.smsStatus = '-'
            }
            this.summaryList.push(x);
          });
          console.log('Response : ', resp['body']['responseObject'])
          // this.initializeForm();
        } else {
          this.initializeForm();
          // this.pageNumber = 0;
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    })
  }

  downloadResult() {
    this.submitApplicationForm = true;
    console.log('this.search ' , this.searchForm.controls['districtId'].value)
    console.log('this.result ' , this.searchForm.controls['result'].value)
    const reqString = this.searchForm.controls['districtId'].value  + '/result/' +  this.searchForm.controls['result'].value
    console.log('reqString ' , reqString)
    this.jsService.writtenExamResult(reqString).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Result.pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })
  }

  writtenExamResultV2() {
    this.submitApplicationForm = true;
    console.log('this.search ' , this.searchForm.controls['districtId'].value)
    console.log('this.result ' , this.searchForm.controls['result'].value)
    const reqString = this.searchForm.controls['districtId'].value  + '/result/' +  this.searchForm.controls['result'].value
    console.log('reqString ' , reqString)
    this.jsService.writtenExamResultV2(reqString).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const blob = new Blob([resp], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        // this.enablePrintReceipt = false;
      }
    })
  }


}
