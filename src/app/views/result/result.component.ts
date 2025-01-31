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
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
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
  minDate = "2021-11-01";

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
  actionList = [
    {
      id: 1,
      name: 'PST Pass'
    }, {
      id: 2,
      name: 'PST Fail'
    }, {
      id: 3,
      name: 'PET Pass'
    }, {
      id: 4,
      name: 'PET Fail'
    }, {
      id: 5,
      name: 'Driver Pass'
    }, {
      id: 6,
      name: 'Driver Fail'
    }
  ]
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
  ) { }

  ngOnInit() {
    this.district();
    this.initializeForm();
    this.performInit();
    this.checkRole();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
    // this.pageNumber = this.pageNumber + 1;
    // this.reqObj.page = this.pageNumber;
    // this.search(this.reqObj);
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 3 && resp.id !== 2 && resp.id !== 14) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
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
      petDate: new FormControl('', Validators.required),
      districtId: new FormControl(''),
      action: new FormControl('', Validators.required),
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
      districtId: this.searchForm.controls['districtId'].value || null,
      petDate: this.searchForm.controls['petDate'].value || null,
      action: this.searchForm.controls['action'].value || null
    };
    this.hitSearchApi(this.reqObj);
  }


  hitSearchApi(reqObj) {
    this.summaryList = [];
    this.pstPetReports(reqObj)
  }

  pstPetReports(reqObj) {
    console.log('hitSearchApi : ')
    this.submitSearchForm = true;
    if (this.searchForm.valid) {
      this.applicationService.pstPetReports(reqObj).then((resp: any) => {
        if (resp.status == 200) {
          if (resp['body']['responseCode'] == 200) {
            this.submitSearchForm = false;
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
            this.submitSearchForm = false;
            this.initializeForm();
            // this.pageNumber = 0;
            this.sharedService.showWarning(resp['body']['responseDesc'])
          }
        }
      })
    }

  }

}
