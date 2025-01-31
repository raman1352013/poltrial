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
  selector: 'app-admit-card-scrutiny',
  templateUrl: './admit-card-scrutiny.component.html',
  styleUrls: ['./admit-card-scrutiny.component.css']
})
export class AdmitCardScrutinyComponent implements OnInit {

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
  petTime = {
    hour: '',
    minute: '',
    second: ''
  };
  petDate: any;
  gender: any;
  noOfCandidate: any;
  enableGender = true;
  venueName: any;
  petDisplayTime: any;
  tiemList = [
    {
      id: '06:00:00',
      value: '06 AM'
    }, {
      id: '07:00:00',
      value: '07 AM'
    }, {
      id: '08:00:00',
      value: '08 AM'
    }, {
      id: '09:00:00',
      value: '09 AM'
    }, {
      id: '10:00:00',
      value: '10 AM'
    }, {
      id: '11:00:00',
      value: '11 AM'
    }
  ]
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
    // this.venue();
    console.log('minDate ', this.minDate)
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if(resp) {
        this.applicationService.scrutinyVenue(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
               this.venuDetails = res['body']['responseObject'];
               this.generateAdmitCardForm.controls['venue'].setValue(this.venuDetails.name)
             }
          }
        })
      }
    })
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
      timeOfPet: new FormControl(''),
      reportingTime: new FormControl('', Validators.required),
      gender: new FormControl(''),
      noCandidates: new FormControl('', Validators.required),
      noCandidatesAvl: new FormControl(''),
      venue: new FormControl('', Validators.required),
      isDriver: new FormControl(''),
    });
    // this.venue();
    // this.checkRole();
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if(resp) {
        this.applicationService.scrutinyVenue(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
               this.venuDetails = res['body']['responseObject'];
               this.generateAdmitCardForm.controls['venue'].setValue(this.venuDetails.name)
             }
          }
        })
      }
    })
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
        this.masterService.examVenue(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              // this.venueList = res['body']['responseObject'];
              this.venuDetails = res['body']['responseObject'];
              // this.generateAdmitCardForm.controls['venue'].setValue(res['body']['responseObject'].name);
            }
          }
        });
      }
    });
  }

  admitCardSummary() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        this.applicationService.documentationAdmitCardSummary(resp.id).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              this.responseAdmitCardSummary = res['body']['responseObject'];
              const response = res['body']['responseObject'];
              this.scheduledDetails = res['body']['responseObject'];
              this.manageAdmitCardsForm.controls['totalDistrictCandidatesMale'].setValue(response.totalCandidateMaleGeneral);
              this.manageAdmitCardsForm.controls['totalDistrictCandidatesFemale'].setValue(response.totalCandidateFemale);
              this.manageAdmitCardsForm.controls['admitCardsGeneratedMale'].setValue(response.admitCardGeneratedMaleGeneral);
              this.manageAdmitCardsForm.controls['admitCardsGeneratedFemale'].setValue(response.admitCardGeneratedFemale);
              this.manageAdmitCardsForm.controls['balanceMale'].setValue(response.admitCardBalanceMaleGeneral);
              this.manageAdmitCardsForm.controls['balanceFemale'].setValue(response.admitCardBalanceFemale);

              this.manageAdmitCardsForm.controls['totalCandidateMaleDriver'].setValue(response.totalCandidateMaleDriver);
              this.manageAdmitCardsForm.controls['admitCardGeneratedMaleDriver'].setValue(response.admitCardGeneratedMaleDriver);
              this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].setValue(response.admitCardBalanceMaleDriver);
              this.manageAdmitCardsForm.disable();
              this.generateAdmitCardForm.controls['dateOfPet'].setValue('03-07-2022')
            }
          }
        });
      }
    });
  }

  getPet(event) {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        console.log('event ', this.generateAdmitCardForm.controls['dateOfPet'].value)
        const datePipe = new DatePipe('en-US');
        // const transformedDate = datePipe.transform(this.generateAdmitCardForm.controls['dateOfPet'].value, 'yyyy-MM-dd');
        const reqObj = {
          districtId: resp.id,
          examDate: '2022-07-03',
          examVenue: event.target.value
        };
        console.log('reqObj ', reqObj)
        this.applicationService.getExamCandidateCount(reqObj).then((res: any) => {
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
      // if (this.generateAdmitCardForm.controls['gender'].value == '2') {
      //   if (this.manageAdmitCardsForm.controls['balanceMale'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
      //     this.sharedService.showWarning('No. of Candidates can not be greater than male balance')
      //   } else {
      //     const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
      //     let hr = reportingTime.hour;
      //     let min = reportingTime.minute;
      //     if (hr < 10) {
      //       hr = '0' + hr;
      //     }
      //     if (min < 10) {
      //       min = '0' + min;
      //     }
      //     this.petTime = hr + ':' + min + ':00';
          const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
          this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
          const petDisplayTime = this.generateAdmitCardForm.controls['timeOfPet'].value
          const petHour = petDisplayTime.hour < 10 ? '0' + petDisplayTime.hour : petDisplayTime.hour;
          const petMin = petDisplayTime.minute < 10 ? '0' + petDisplayTime.minute: petDisplayTime.minute;
          this.tiemList.forEach(x=> {
            if(x.id == this.generateAdmitCardForm.controls['reportingTime'].value) {
              this.petDisplayTime = x.value
            }
          })
          // this.petDisplayTime = this.generateAdmitCardForm.controls['reportingTime'].value;
          let gender;
          if(this.generateAdmitCardForm.controls['gender'].value == 1) {
            gender = 'Female'
          } else if(this.generateAdmitCardForm.controls['gender'].value == 2) {
            gender = 'Male'
          }
          this.gender = gender;
          console.log('this.petTime ' , this.petDisplayTime)
          let venue = this.generateAdmitCardForm.controls['venue'].value;
          console.log('venue ' , venue)
          console.log('this.venuDetails ' , this.venuDetails)
          // let venueArray = this.venuDetails.filter(x=> x.id == venue);
          // console.log()
          // this.venuDetails.forEach(element => {
          //   if(element.id == venue) {
          //     console.log('venueArray ' , venueArray[0])
          //   }
          // });
          
          this.venueName = this.generateAdmitCardForm.controls['venue'].value;
          this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;
      //     this.gender = this.generateAdmitCardForm.controls['gender'].value;
      //     this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

      //     this.openmd(this.consentPopUp);
      //   }
      // } else if (this.generateAdmitCardForm.controls['gender'].value == '1') {
      //   if (this.manageAdmitCardsForm.controls['balanceFemale'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
      //     this.sharedService.showWarning('No. of Candidates can not be greater than female balance')
      //   } else {
      //     const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
      //     let hr = reportingTime.hour;
      //     let min = reportingTime.minute;
      //     if (hr < 10) {
      //       hr = '0' + hr;
      //     }
      //     if (min < 10) {
      //       min = '0' + min;
      //     }
      //     this.petTime = hr + ':' + min + ':00';
      //     const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
      //     this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
      //     // this.petDate = this.generateAdmitCardForm.controls['dateOfPet'].value;
      //     this.gender = this.generateAdmitCardForm.controls['gender'].value;
      //     this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

      //     this.openmd(this.consentPopUp);
      //   }
      // } else {
      //   if (this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].value < this.generateAdmitCardForm.controls['noCandidates'].value) {
      //     this.sharedService.showWarning('No. of Candidates can not be greater than female balance')
      //   } else {
      //     const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
      //     let hr = reportingTime.hour;
      //     let min = reportingTime.minute;
      //     if (hr < 10) {
      //       hr = '0' + hr;
      //     }
      //     if (min < 10) {
      //       min = '0' + min;
      //     }
      //     this.petTime = hr + ':' + min + ':00';
      //     const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
      //     this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
      //     // this.petDate = this.generateAdmitCardForm.controls['dateOfPet'].value;
      //     this.gender = this.generateAdmitCardForm.controls['gender'].value;
      //     this.noOfCandidate = this.generateAdmitCardForm.controls['noCandidates'].value;

      //     this.openmd(this.consentPopUp);
      //   }
      // }
      this.openmd(this.consentPopUp);
    }


  }

  generateAdmitCard() {
    this.sharedService.confirm2('Confirm', 'Do you want to schedule the evaluation of documents and generate the admit cards?').then((res: any) => {
      console.log('RESP: ', res)
      if (res == true) {

        const selectedGender = this.generateAdmitCardForm.controls['gender'].value;
        const balanceMale = this.manageAdmitCardsForm.controls['balanceMale'].value;
        const balanceFemale = this.manageAdmitCardsForm.controls['balanceFemale'].value;
        const balanceCount = this.generateAdmitCardForm.controls['noCandidates'].value;

        const balanceDriver = this.manageAdmitCardsForm.controls['admitCardBalanceMaleDriver'].value;
        const driver = this.generateAdmitCardForm.controls['isDriver'].value;
        // if (selectedGender == 2) {
        //   if (balanceCount > balanceMale) {
        //     this.sharedService.showWarning("Candidate count can't be greater than balance");
        //   } else {
        //     this.finalSubmit();
        //   }
        // } else if (selectedGender == 1) {
        //   if (balanceCount > balanceFemale) {
        //     this.sharedService.showWarning("Candidate count can't be greater than balance");
        //   } else {
        //     this.finalSubmit();
        //   }
        // } else if (driver) {
        //   if (balanceCount > balanceDriver) {
        //     this.sharedService.showWarning("Candidate count can't be greater than balance");
        //   } else {
        //     this.generateAdmitCardForm.controls['gender'].setValue('')
        //     this.finalSubmit();
        //   }
        // }
        this.finalSubmit();
      }
    });
  }

  finalSubmit() {
    this.sharedService.getLocalStorageItem('district').then((district: any) => {
      if (district) {
        console.log('reportingTime', this.generateAdmitCardForm.controls['reportingTime'].value)
        // const reportingTime = this.generateAdmitCardForm.controls['reportingTime'].value;
        // let hr = reportingTime.hour;
        // let min = reportingTime.minute;
        // if (hr < 10) {
        //   hr = '0' + hr;
        // }
        // if (min < 10) {
        //   min = '0' + min;
        // }
        // this.petDate = petDateArray[2] + '-' + petDateArray[1] + '-' + petDateArray[0];
        //   this.petTime = this.generateAdmitCardForm.controls['timeOfPet'].value
        //   console.log('this.petTime ' , this.petTime)
        //   let venue = this.generateAdmitCardForm.controls['venue'].value;
        //   console.log('venue ' , venue)
        //   console.log('this.venuDetails ' , this.venuDetails)
        const petDateArray = (this.generateAdmitCardForm.controls['dateOfPet'].value).split('-');
        const petDate = petDateArray[0] + '-' + petDateArray[1] + '-' + petDateArray[2];
        console.log('petDateArray ' , petDateArray)
        const petTime = this.generateAdmitCardForm.controls['timeOfPet'].value;
        const petHour = petTime.hour < 10 ? '0' + petTime.hour : petTime.hour;
        const petMin = petTime.minute < 10 ? '0' + petTime.minute: petTime.minute
        const reqObj = {
          districtId: district.id,
          //  noOfCandidate: this.generateAdmitCardForm.controls['noCandidates'].value,
          scrutinyVenue: this.venuDetails.id,
          scrutinyDate: petDate,
          noOfCandidate: Number(this.generateAdmitCardForm.controls['noCandidates'].value),
          // scrutinyTime: petHour + ':' + petMin + ':' + '00',
          scrutinyTime:  this.generateAdmitCardForm.controls['reportingTime'].value,
          gender:  this.generateAdmitCardForm.controls['gender'].value,
         };
        console.log('Req Obj ', reqObj);
        this.applicationService.generateScrutinyAdmitCard(reqObj).then((resp: any) => {
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
    this.router.navigateByUrl('/ScrutinyDetails');
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
      action: 201,
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


  getVenue() {
    this.sharedService.getLocalStorageItem('district').then((resp: any) => {
      if (resp) {
        const datePipe = new DatePipe('en-US');
        // const transformedDate = datePipe.transform(this.generateAdmitCardForm.controls['dateOfPet'].value, 'yyyy-MM-dd');
        const reqObj = {
          districtId: resp.id,
          examDate: '2022-07-03',
          examVenue: this.generateAdmitCardForm.controls['venue'].value
        };
        console.log('reqObj ', reqObj)
        this.applicationService.getExamCandidateCount(reqObj).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              this.generateAdmitCardForm.controls['noCandidatesAvl'].setValue(res['body']['responseObject']);
            }
          }
        });
      }
    });
  }

  getScrutinyCandidateCount() {
    this.sharedService.getLocalStorageItem('district').then((destrict: any) => {
      if(destrict) {
        const reqObj = {
          districtId: destrict.id,
          scrutinyVenue: this.venuDetails.id,
          scrutinyDate: this.generateAdmitCardForm.controls['dateOfPet'].value
        }
        this.applicationService.getScrutinyCandidateCount(reqObj).then((res: any) => {
          if (res.status == 200) {
            if (res['body']['responseCode'] == 200) {
              this.generateAdmitCardForm.controls['noCandidatesAvl'].setValue(res['body']['responseObject']);
            }
          }
        })
      }
    })
    
  }


}
