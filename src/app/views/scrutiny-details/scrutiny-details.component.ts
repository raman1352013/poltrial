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
  selector: 'app-scrutiny-details',
  templateUrl: './scrutiny-details.component.html',
  styleUrls: ['./scrutiny-details.component.css']
})
export class ScrutinyDetailsComponent implements OnInit {
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
  minDate = new Date().toISOString().split("T")[0]
  // minDate = "2021-11-01"
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

  constructor(
    private masterService: MasterService,
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private jsService: JsService,
    private modalService: NgbModal,
    private paymentService: PaymentService,
    private smsService: SmsService,
    private router: Router) { }

  ngOnInit() {
    this.district();
    this.initializeForm();
    this.performInit();
    this.checkRole();
    // this.getVenue();
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
            this.searchForm.controls['districtId'].setValue(district.id);
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
      petDate: new FormControl(null),
      msisdn: new FormControl(null),
      districtId: new FormControl(null),
      gender: new FormControl(null),
      rollNumber: new FormControl(null),
      examVenue: new FormControl(null),
      rollNoFrom: new FormControl(null),
      rollNoTo: new FormControl(null),
      applicationId: new FormControl(null),
      dateOfPet: new FormControl(null),
      // batchId: new FormControl(''),
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


  searchApplication() {
    this.pageNumber = 0;
    this.reqObj = {
      districtId:this.searchForm.controls['districtId'].value || null, 
      // examVenue: this.searchForm.controls['examVenue'].value || null, 
      rollNo: this.searchForm.controls['rollNumber'].value || null,
      msisdn: this.searchForm.controls['msisdn'].value || null,
      applicationNumber: this.searchForm.controls['applicationId'].value || null,
      scrutinyDate: this.searchForm.controls['dateOfPet'].value || null,
      page: 0
    }
    this.hitSearchApi(this.reqObj);
  }
  hitSearchApi(reqObj) {
    this.summaryList = [];
    this.search(reqObj)
  }

  search(reqObj) {
    console.log('hitSearchApi : ')
    this.applicationService.candidatesScrutinyScheduled(reqObj).then((resp: any) => {
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

  confirm(x) {
    this.open(this.attendanceRemarks, x)
  }

  open(content, x) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false

    }).result.then((result) => {
      if (result == 'Remarks Ok') {
        if (this.confirmationForm.controls['remarks'].value) {
          this.removeCandidatePet(x);
        } else {
          this.sharedService.showWarning('Remarks not entered');
        }
      } else if (result == 'Send SMS') {
        this.sendSMS(x);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  removeCandidatePet(x) {
    console.log('X', x);
    const reqObj = {
      id: x.id,
      remarks: this.confirmationForm.controls['remarks'].value
    };
    this.applicationService.removeCandidatePet(reqObj).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.initializeForm();
          this.searchApplication();
        }
      }
    })

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

  downloadAdmitCard(x) {
    this.jsService.scrutinyAdmitCardPdf(x.rollNo).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Admit card-Scrutiny-"+x.applicationNumber +".pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })
  }
  getPet() {

  }

  confirmSendSMS(x) {
    this.open(this.secondConsentPopUp, x);
  }

  sendSMS(x) {
    const reqObj = {
      action: 200,
      id: x.id
    };
    this.smsService.sendSms(reqObj).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {

          this.searchApplication();
        }
      }
    });
  }

  downloadAttendence() {
    this.submitApplicationForm = true;
    if(this.downloadPdfForm.valid) {

      if(this.downloadPdfForm.controls['rollNoTo'].value > this.downloadPdfForm.controls['rollNoFrom'].value) {
        const reqObj = {
          district: this.searchForm.controls['districtId'].value,
          rollNoFrom: this.downloadPdfForm.controls['rollNoFrom'].value,
          rollNoTo: this.downloadPdfForm.controls['rollNoTo'].value,
        }
        this.jsService.attendancePdf(reqObj).then((resp: any) => {
          const downloadURL = window.URL.createObjectURL(resp);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'Attendance Sheet ' + this.downloadPdfForm.controls['rollNoFrom'].value + '-' + this.downloadPdfForm.controls['rollNoTo'].value + '.pdf';
            link.click();
        })
      } else {
        this.sharedService.showWarning('Please enter correct value')
      }
      
    }
    
  }

  // getScrutinyCandidateCount() {
  //   this.sharedService.getLocalStorageItem('district').then((destrict: any) => {
  //     if(destrict) {
  //       const reqObj = {
  //         districtId: destrict.id,
  //         scrutinyVenue: 1, //this.venuDetails.id,
  //         scrutinyDate: this.generateAdmitCardForm.controls['dateOfPet'].value
  //       }
  //       this.applicationService.getScrutinyCandidateCount(reqObj).then((res: any) => {
  //         if (res.status == 200) {
  //           if (res['body']['responseCode'] == 200) {
  //             this.generateAdmitCardForm.controls['noCandidatesAvl'].setValue(res['body']['responseObject']);
  //           }
  //         }
  //       })
  //     }
  //   })
    
  // }


}
