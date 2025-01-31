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
import { ReportsService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild('attendanceRemarks') attendanceRemarks;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  // @ViewChild('attendanceRemarks') attendanceRemarks;
  searchForm: FormGroup;
  confirmationForm: FormGroup;
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
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private jsService: JsService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private smsService: SmsService,
    private router: Router,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.district();
    this.initializeForm();
    this.performInit();
    this.checkRole();
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

  district() {
    this.masterService.districts(9).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.districtList = resp['body']['responseObject'];
          console.log('this.districtList ', this.districtList)
          if (this.disableDistrict == true) {
            this.sharedService.getLocalStorageItem('district').then((district: any) => {
              if (district) {
                console.log('district ', district.id)
                this.searchForm.controls['districtId'].setValue(district.id);
              }
            })
          }

        }
      }
    });
  }


  performInit() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      console.log('this.sharedService.getValue() ', this.sharedService.getValue())
      let batchId;
      if (this.sharedService.getValue()) {
        batchId = this.sharedService.getValue().batchId;
        // this.reqObj = {
        //   msisdn: null,
        //   districtId: null,
        //   gender: null,
        //   applicationNumber: null,
        //   batchId: this.sharedService.getValue().batchId,
        //   page: this.pageNumber
        // }
      } else {
        batchId = null;
      }
      this.reqObj = {
        msisdn: null,
        districtId: null,
        gender: null,
        applicationNumber: null,
        batchId: batchId,
        page: this.pageNumber
      };
      if (resp.id == 2) {
        this.sharedService.getLocalStorageItem('district').then((district: any) => {
          if (district) {
            console.log('district ', district.id)
            // this.searchForm.controls['districtId'].setValue(district.id);
            this.disableDistrict = true;
            this.reqObj.districtId = district.id;

            if (this.sharedService.getValue()) {
              this.hitSearchApi(this.reqObj);
            }
          } else {
            this.summaryList = []
          }
        });
      } else {
        if (this.sharedService.getValue()) {
          this.hitSearchApi(this.reqObj);
        } else {
          this.summaryList = []
        }

        this.disableDistrict = false;
      }
    });
  }

  initializeForm() {
    this.searchForm = new FormGroup({
      petDate: new FormControl(''),
      msisdn: new FormControl(''),
      districtId: new FormControl(''),
      gender: new FormControl(''),
      applicationNumber: new FormControl(''),
      // batchId: new FormControl(''),
    });

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

  searchApplication() {
    this.pageNumber = 0;
    this.reqObj = {
      districtId: this.searchForm.controls['districtId'].value,
      petDate: this.searchForm.controls['petDate'].value,
    }
    this.hitSearchApi(this.reqObj);
  }

  hitSearchApi(reqObj) {
    this.summaryList = [];
    this.petSummary(reqObj)
  }

  petSummary(reqObj) {
    console.log('hitSearchApi : ')
    this.reportsService.petSummary(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          // this.initializeForm();
          this.summaryList = resp['body']['responseObject'].petSummaryList;
          // this.summaryList = response);
          console.log('this.summaryList : ' + JSON.stringify(this.summaryList))
          // this.initializeForm();
        } else {
          this.initializeForm();
          // this.pageNumber = 0;
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    })
  }

}
