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
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent implements OnInit {
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
  userId;
  totalQualified = [];
  totaldisqualified = [];

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
    this.searchApplication();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        this.userId = resp.id;
        if (resp.id !== 3 && resp.id !== 2 && resp.id !== 4 && resp.id !== 5 && resp.id !== 6 && resp.id !== 7 && resp.id !== 8 && resp.id !== 9 && resp.id !== 10) {
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
              this.hitSearchApi();
            }
          } else {
            this.summaryList = []
          }
        });
      } else {
        if (this.sharedService.getValue()) {
          this.hitSearchApi();
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
    // this.pageNumber = 0;
    // this.reqObj = {
    //   districtId: this.searchForm.controls['districtId'].value,
    //   petDate: this.searchForm.controls['petDate'].value,
    // }
    this.hitSearchApi();
  }

  hitSearchApi() {
    this.summaryList = [];
    this.petSummary()
  }

  petSummary() {
    this.totalQualified = [];
    this.totaldisqualified = [];
    console.log('hitSearchApi : ')
    this.reportsService.pstPetIndividualReports().then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          // this.initializeForm();

          resp['body']['responseObject'].forEach(element => {
            if (element.petBroadJump.broadJumpStatusOne == 'P') {
              element.petBroadJump.broadJumpStatusOne = 'Qualified';
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petBroadJump.broadJumpStatusOne == 'F') {
              element.petBroadJump.broadJumpStatusOne = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petBroadJump.broadJumpStatusOne = '-'
            }

            if (element.petBroadJump.broadJumpStatusTwo == 'P') {
              element.petBroadJump.broadJumpStatusTwo = 'Qualified';
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petBroadJump.broadJumpStatusTwo == 'F') {
              element.petBroadJump.broadJumpStatusTwo = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petBroadJump.broadJumpStatusTwo = '-'
            }

            if (element.petBroadJump.broadJumpStatusThree == 'P') {
              element.petBroadJump.broadJumpStatusThree = 'Qualified';
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petBroadJump.broadJumpStatusThree == 'F') {
              element.petBroadJump.broadJumpStatusThree = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petBroadJump.broadJumpStatusThree = '-'
            }

            // High Jump
            console.log('element.petJump.highJumpStatusOne ', element.petJump.highJumpStatusThree);
            if (element.petJump.highJumpStatusOne == 'P') {
              element.petJump.highJumpStatusOne = 'Qualified';
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petJump.highJumpStatusOne == 'F') {
              element.petJump.highJumpStatusOne = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petJump.highJumpStatusOne = '-'
            }
            if (element.petJump.highJumpStatusTwo == 'P') {
              element.petJump.highJumpStatusTwo = 'Qualified';
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petJump.highJumpStatusTwo == 'F') {
              element.petJump.highJumpStatusTwo = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petJump.highJumpStatusTwo = '-'
            }

            if (element.petJump.highJumpStatusThree == 'P') {
              element.petJump.highJumpStatusThree = 'Qualified'
              // this.totalQualified.push({ qualified: 'Qualified' });
            } else if (element.petJump.highJumpStatusThree == 'F') {
              element.petJump.highJumpStatusThree = 'Not Qualified';
              // this.totaldisqualified.push({ qualified: 'Not Qualified' });
            } else {
              element.petJump.highJumpStatusThree = '-'
            }
            this.summaryList.push(element);
          });

          this.summaryList.forEach(x => {
            if (this.userId == 5) {
              if (x.petHeights.heightExamStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'heightExamStatusP' })
              } else if (x.petHeights.heightExamStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'heightExamStatusF' })
              }
            }
            if (this.userId == 6) {
              if (x.petChest.chestExamStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'chestExamStatusP' })
              } else if (x.petChest.chestExamStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'chestExamStatusF' })
              }
            }
            if (this.userId == 9) {
              if (x.petJump.highJumpStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'highJumpStatusP' })
              } else if (x.petJump.highJumpStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'highJumpStatusF' })
              }
            }
            if (this.userId == 8) {
              if (x.petBroadJump.broadJumpStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'broadJumpStatusP' })
              } else if (x.petBroadJump.broadJumpStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'broadJumpStatusP' })
              }
            }
            if (this.userId == 7) {
              if (x.petRace.raceExamStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'raceExamStatusP' })
              } else if (x.petRace.raceExamStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'raceExamStatusP' })
              }
            }
            if (this.userId == 10) {
              if (x.petDriver.driverExamStatus == 'P') {
                this.totalQualified.push({ status: 'Qualified', section: 'driverExamStatusP' })
              } else if (x.petDriver.driverExamStatus == 'F') {
                this.totaldisqualified.push({ status: 'Not Qualified', section: 'driverExamStatusP' })
              }
            }
          })
          // this.summaryList = response);
          console.log('this.totalQualified' + JSON.stringify(this.totalQualified))
          console.log('this.totaldisqualified' + JSON.stringify(this.totaldisqualified))
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
