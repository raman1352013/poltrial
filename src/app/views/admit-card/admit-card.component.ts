import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { SharedService } from '../../services/shared/shared.service';
import { MasterService } from '../../services/master/master.service';
import { DatePipe } from '@angular/common';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SmsService } from '../../services/sms/sms.service';


@Component({
  selector: 'app-admit-card',
  templateUrl: './admit-card.component.html',
  styleUrls: ['./admit-card.component.css']
})
export class AdmitCardComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  manageAdmitCardsForm: FormGroup;
  generateAdmitCardForm: FormGroup;
  enableForm = true;
  venueList = [];
  venuDetails;
  scheduledDetails;
  district;
  responseAdmitCardSummary: any;
  submitApplicationForm = false;
  minDate = new Date().toISOString().split("T")[0]
  closeResult: string;
  petTime: string;
  petDate: any;
  gender: any;
  noOfCandidate: any;
  enableGender = true;
  constructor(
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private masterService: MasterService,
    private router: Router,
    private modalService: NgbModal,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.admitCardSummary();
    this.venue();
    console.log('minDate ', this.minDate)
  }

  initializeForm() {
    this.manageAdmitCardsForm = new FormGroup({
      admitCardBalanceMaleDriver: new FormControl(''),
      admitCardGeneratedMaleDriver: new FormControl(''),
      totalCandidateMaleDriver: new FormControl(''),
      totalDistrictCandidatesMale: new FormControl(''),
      totalDistrictCandidatesFemale: new FormControl(''),
      admitCardsGeneratedMale: new FormControl(''),
      admitCardsGeneratedFemale: new FormControl(''),
      balanceMale: new FormControl(''),
      balanceFemale: new FormControl(''),
    });

    this.generateAdmitCardForm = new FormGroup({
      dateOfPet: new FormControl('', Validators.required),
      reportingTime: new FormControl('', Validators.required),
      gender: new FormControl(''),
      noCandidates: new FormControl('', Validators.required),
      noCandidatesAvl: new FormControl(''),
      venue: new FormControl(''),
      isDriver: new FormControl(''),
    });
    this.venue();
    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 2) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
          // this.sharedService.showWarning();
        }
      }
    });
  }

  venue() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        this.district = resp.name;
        this.masterService.venue(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              // this.venueList = res['body']['responseObject'];
              this.venuDetails = res['body']['responseObject'];
              this.generateAdmitCardForm.controls['venue'].setValue(res['body']['responseObject'].name);
            }
          }
        });
      }
    });
  }

  admitCardSummary() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        this.applicationService.admitCardSummary(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              this.responseAdmitCardSummary = res['body']['responseObject'];
              const response = res['body']['responseObject'];
              this.scheduledDetails = res['body']['responseObject'];
              this.manageAdmitCardsForm.controls['totalDistrictCandidatesMale'].setValue(response.totalCandidateMale);
              this.manageAdmitCardsForm.controls['totalDistrictCandidatesFemale'].setValue(response.totalCandidateFemale);
              this.manageAdmitCardsForm.controls['admitCardsGeneratedMale'].setValue(response.admitCardGeneratedMale);
              this.manageAdmitCardsForm.controls['admitCardsGeneratedFemale'].setValue(response.admitCardGeneratedFemale);
              this.manageAdmitCardsForm.controls['balanceMale'].setValue(response.admitCardBalanceMale);
              this.manageAdmitCardsForm.controls['balanceFemale'].setValue(response.admitCardBalanceFemale);

              this.manageAdmitCardsForm.controls['totalCandidateMaleDriver'].setValue(response.totalCandidateMaleDriver);
              this.manageAdmitCardsForm.controls['admitCardGeneratedMaleDriver'].setValue(response.admitCardGeneratedMaleDriver);
              this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].setValue(response.admitCardBalanceMaleDriver);
              this.manageAdmitCardsForm.disable();
            }
          }
        });
      }
    });
  }

  getPet() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        console.log('event ', this.generateAdmitCardForm.controls['dateOfPet'].value)
        const datePipe = new DatePipe('en-US');
        const transformedDate = datePipe.transform(this.generateAdmitCardForm.controls['dateOfPet'].value, 'yyyy-MM-dd');
        const reqObj = {
          districtId: resp.id,
          petDate: transformedDate
        };
        this.applicationService.getPetCandidateCount(reqObj).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              this.generateAdmitCardForm.controls['noCandidatesAvl'].setValue(res['body']['responseObject']);
            }
          }
        });
      }
    });
  }

  selectGender(value) {
    console.log('Value ', value);

  }

  confirmation() {
    this.submitApplicationForm = true;
    if (this.generateAdmitCardForm.valid) {
      if (this.generateAdmitCardForm.controls['gender'].value == '2') {
        if (this.manageAdmitCardsForm.controls['balanceMale'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
          this.sharedService.showWarning('No. of Candidates can not be greater than male balance')
        } else {
          const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
          let hr = reportingTime.hour;
          let min = reportingTime.minute;
          if (hr < 10) {
            hr = '0' + hr;
          }
          if (min < 10) {
            min = '0' + min;
          }
          this.petTime = hr + ':' + min + ':00';
          const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
          this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
          this.gender = this.generateAdmitCardForm.controls['gender'].value;
          this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

          this.openmd(this.consentPopUp);
        }
      } else if (this.generateAdmitCardForm.controls['gender'].value == '1') {
        if (this.manageAdmitCardsForm.controls['balanceFemale'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
          this.sharedService.showWarning('No. of Candidates can not be greater than female balance')
        } else {
          const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
          let hr = reportingTime.hour;
          let min = reportingTime.minute;
          if (hr < 10) {
            hr = '0' + hr;
          }
          if (min < 10) {
            min = '0' + min;
          }
          this.petTime = hr + ':' + min + ':00';
          const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
          this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
          // this.petDate = this.generateAdmitCardForm.controls['dateOfPet'].value;
          this.gender = this.generateAdmitCardForm.controls['gender'].value;
          this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

          this.openmd(this.consentPopUp);
        }
      } else {
        if (this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
          this.sharedService.showWarning('No. of Candidates can not be greater than female balance')
        } else {
          const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
          let hr = reportingTime.hour;
          let min = reportingTime.minute;
          if (hr < 10) {
            hr = '0' + hr;
          }
          if (min < 10) {
            min = '0' + min;
          }
          this.petTime = hr + ':' + min + ':00';
          const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
          this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
          // this.petDate = this.generateAdmitCardForm.controls['dateOfPet'].value;
          this.gender = this.generateAdmitCardForm.controls['gender'].value;
          this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

          this.openmd(this.consentPopUp);
        }
      }
    }


  }

  generateAdmitCard() {
    this.sharedService.confirm2('Confirm', 'Do you want to schedule the PET and generate the admit cards?').then((res: any) => {
      console.log('RESP: ', res)
      if (res == true) {

        const selectedGender = this.generateAdmitCardForm.controls['gender'].value;
        const balanceMale = this.manageAdmitCardsForm.controls['balanceMale'].value;
        const balanceFemale = this.manageAdmitCardsForm.controls['balanceFemale'].value;
        const balanceCount = this.generateAdmitCardForm.controls['noCandidates'].value;

        const balanceDriver = this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].value;
        const driver = this.generateAdmitCardForm.controls['isDriver'].value;
        if (selectedGender == 2) {
          if (balanceCount > balanceMale) {
            this.sharedService.showWarning("Candidate count can't be greater than balance");
          } else {
            this.finalSubmit();
          }
        } else if (selectedGender == 1) {
          if (balanceCount > balanceFemale) {
            this.sharedService.showWarning("Candidate count can't be greater than balance");
          } else {
            this.finalSubmit();
          }
        } else if (driver) {
          if (balanceCount > balanceDriver) {
            this.sharedService.showWarning("Candidate count can't be greater than balance");
          } else {
            this.generateAdmitCardForm.controls['gender'].setValue('')
            this.finalSubmit();
          }
        }
      }
    });
  }

  finalSubmit() {
    this.sharedService.getLocalStorageItem('district').then((district: any) => {
      if (district) {
        console.log('reportingTime', this.generateAdmitCardForm.controls['reportingTime'].value)
        const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
        let hr = reportingTime.hour;
        let min = reportingTime.minute;
        if (hr < 10) {
          hr = '0' + hr;
        }
        if (min < 10) {
          min = '0' + min;
        }
        const reqObj = {
          districtId: district.id,
          gender: this.generateAdmitCardForm.controls['gender'].value || null,
          noOfCandidate: this.generateAdmitCardForm.controls['noCandidates'].value,
          venue: this.venuDetails.id,
          petDate: this.generateAdmitCardForm.controls['dateOfPet'].value,
          petTime: hr + ':' + min + ':0',
          postAppliedFor: this.generateAdmitCardForm.controls['isDriver'].value == true ? 'D' : null
        };
        console.log('Req Obj ', reqObj);
        this.applicationService.generateAdmitCard(reqObj).then((resp: any) => {
          if (resp.status == 200) {
            if (resp['body']['responseCode'] == 200) {
              this.sharedService.showSuccess(resp['body']['responseDesc']);
              // this.router.navigateByUrl('/Home');
              console.log('Response ', resp['body']['responseObject'])
              this.initializeForm();
              this.admitCardSummary();
              this.enableGender = true;
              this.enableForm = false;
              this.submitApplicationForm = false;
            } else {
              this.sharedService.showWarning(resp['body']['responseDesc'])
            }
          }
        });
      }
    });
  }

  openmd(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'first consent') {

        this.generateAdmitCard();
        // this.doubleConfirm();
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

  showDetails() {
    this.enableForm = false;

  }

  hideDetails() {
    this.enableForm = true;
  }

  applicationDetails(x) {
    console.log('X ', x)
    this.sharedService.setValue(x);
    this.router.navigateByUrl('/PetDetails');
  }

  confirmSendSMS(x) {
    this.sharedService.confirm2('Confirm', 'Do you really want to send the SMS?').then((resp: any) => {
      if (resp == true) {
        this.sendSMS(x);
      }
    });
  }


  sendSMS(x) {
    const reqObj = {
      action: 2,
      batchId: x.batchId
    };
    this.smsService.sendSms(reqObj).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.initializeForm();
          this.admitCardSummary();
        }
      }
    });
  }

  getDriverPost() {
    console.log("this.generateAdmitCardForm.controls['isDriver'].value ", this.generateAdmitCardForm.controls['isDriver'].value)
    if (this.generateAdmitCardForm.controls['isDriver'].value == true) {
      // this.


      this.enableGender = false;
      this.generateAdmitCardForm.controls['gender'].clearValidators();
    } else {
      this.generateAdmitCardForm.controls['gender'].setValidators([Validators.required]);
      this.enableGender = true;
    }
    this.generateAdmitCardForm.controls['gender'].updateValueAndValidity();
  }

}
