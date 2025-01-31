import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-broad-jump',
  templateUrl: './broad-jump.component.html',
  styleUrls: ['./broad-jump.component.css']
})
export class BroadJumpComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  @ViewChild('confFormPopUP') confFormPopUP;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  remarksForm: FormGroup;
  qrResultString: string;
  enableScanner = false;
  enableForm = false;
  photo: any;
  signature: any;
  response: any;
  status: any;
  closeResult: string;
  enableAttempt2 = false;
  enableAttempt3 = false;
  disableSubmit = true;
  attemptNo: any;
  enableAttempt1 = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 8 && resp.id !== 3) {
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
      applicationNumber: new FormControl(''),
    });
    this.manageAdmitCardsForm = new FormGroup({
      applicationNo: new FormControl(''),
      district: new FormControl(''),
      name: new FormControl(''),
      fatherName: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(''),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      postAppliedFor: new FormControl(''),
      mobileNo: new FormControl(''),
      noField: new FormControl(''),
      attempt1: new FormControl(''),
      attempt2: new FormControl(''),
      attempt3: new FormControl(''),
      isGorkha: new FormControl(''),
    });
    this.remarksForm = new FormGroup({
      remarks: new FormControl('', Validators.required)
    })
  }

  scanQr() {
    this.enableScanner = true;
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.enableScanner = false;
    console.log('qrResultString ', this.qrResultString)
    this.getApplicationSubmitted(this.qrResultString);
    // this.applicationService.getImageV2('P', this.qrResultString);
    // this.applicationService.getImageV2('S', this.qrResultString);
  }

  getApplicationDetails() {

    this.getApplicationSubmitted(this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('P', this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('S', this.searchForm.controls['applicationNumber'].value);
  }

  getApplicationSubmitted(application) {
    this.manageAdmitCardsForm.controls['attempt1'].setValue(null);
    this.manageAdmitCardsForm.controls['attempt2'].setValue(null);
    this.manageAdmitCardsForm.controls['attempt3'].setValue(null);
    this.status = undefined;
    this.enableScanner = false;
    this.applicationService.getApplicationSubmitted(application, 5).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          console.log('Resp', resp['body']['responseObject']);
          this.response = resp['body']['responseObject'];
          const response = resp['body']['responseObject'];
          let postDesc;
          if (response.postAppliedFor == 'G') {
            postDesc = 'General Duty'
          } else {
            postDesc = 'Driver'
          }
          this.enableForm = true;
          this.manageAdmitCardsForm.controls['applicationNo'].setValue(response.applicationNo);
          this.manageAdmitCardsForm.controls['district'].setValue(response.district);
          this.manageAdmitCardsForm.controls['name'].setValue(response.name);
          this.manageAdmitCardsForm.controls['fatherName'].setValue(response.fatherName);
          this.manageAdmitCardsForm.controls['dob'].setValue(response.dob);
          this.manageAdmitCardsForm.controls['gender'].setValue(response.gender);
          this.manageAdmitCardsForm.controls['category'].setValue(response.category);
          this.manageAdmitCardsForm.controls['subCategory'].setValue(response.subCategory);
          this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(postDesc);
          this.manageAdmitCardsForm.controls['mobileNo'].setValue(response.mobileNo);
          this.manageAdmitCardsForm.controls['attempt1'].setValue(response.petDetails.petBroadJump.broadJumpStatusOne);
          this.manageAdmitCardsForm.controls['attempt2'].setValue(response.petDetails.petBroadJump.broadJumpStatusTwo);
          this.manageAdmitCardsForm.controls['attempt3'].setValue(response.petDetails.petBroadJump.broadJumpStatusThree);
          this.manageAdmitCardsForm.controls['isGorkha'].setValue(response.isGorkha == 'Y' ? 'Yes' : 'No');
          // if (response.petDetails.petBroadJump.broadJumpStatusOne && response.petDetails.petBroadJump.broadJumpStatusTwo) {
          //   if (response.petDetails.petBroadJump.broadJumpStatusTwo == 'F') {
          //     this.enableAttempt2 = false;
          //     this.enableAttempt1 = false;
          //     this.enableAttempt3 = null;
          //   } 
          // }

          // if (response.petDetails.petBroadJump.broadJumpStatusOne && response.petDetails.petBroadJump.broadJumpStatusTwo == null) {
          //   if (response.petDetails.petBroadJump.broadJumpStatusTwo == 'F') {
          //     this.enableAttempt2 = null;
          //     this.enableAttempt1 = false;
          //     this.enableAttempt3 = false;
          //   }
          // }
          if (response.petDetails.petBroadJump.broadJumpStatusOne == null && response.petDetails.petBroadJump.broadJumpStatusTwo == null && response.petDetails.petBroadJump.broadJumpStatusThree == null) {
            this.enableAttempt1 = null;
            this.enableAttempt2 = false;
            this.enableAttempt3 = false;
          } else if (response.petDetails.petBroadJump.broadJumpStatusOne && response.petDetails.petBroadJump.broadJumpStatusTwo == null && response.petDetails.petBroadJump.broadJumpStatusThree == null) {
            this.enableAttempt2 = null;
            this.enableAttempt1 = false;
            this.enableAttempt3 = false;
          } else if (response.petDetails.petBroadJump.broadJumpStatusOne && response.petDetails.petBroadJump.broadJumpStatusTwo && response.petDetails.petBroadJump.broadJumpStatusThree == null) {
            this.enableAttempt3 = null;
            this.enableAttempt2 = false;
            this.enableAttempt1 = false;
          } else if (response.petDetails.petBroadJump.broadJumpStatusOne && response.petDetails.petBroadJump.broadJumpStatusTwo && response.petDetails.petBroadJump.broadJumpStatusThree) {
            this.enableAttempt3 = false;
            this.enableAttempt2 = false;
            this.enableAttempt1 = false;
          }


          // if (response.petDetails.petBroadJump.broadJumpStatusOne == 'F') {
          //   this.enableAttempt1 = false;
          //   this.enableAttempt2 = null;
          //   this.enableAttempt3 = false;
          // } else if (response.petDetails.petBroadJump.broadJumpStatusTwo == 'F') {
          //   this.enableAttempt2 = false;
          //   this.enableAttempt1 = false;
          //   this.enableAttempt3 = null;
          // } else {
          //   this.enableAttempt1 = null;
          //   this.enableAttempt2 = false;
          //   this.enableAttempt3 = false;
          // }
          this.applicationService.getImageV2('P', response.applicationId).then((photo: any) => {
            const objectURL = URL.createObjectURL(photo);
            this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          this.applicationService.getImageV2('S', response.applicationId).then((sig: any) => {
            const objectURL = URL.createObjectURL(sig);
            this.signature = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        } else {
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }
      }
    });
  }

  attempt(attempt) {
    console.log('attempt ', attempt)
    let status;
    if (attempt == 1) {
      status = this.manageAdmitCardsForm.controls['attempt1'].value;
      if (status == 'F') {
        // this.enableAttempt2 = true;
        this.disableSubmit = true;
      } else {
        // this.enableAttempt2 = false;
        // this.enableAttempt3 = false;
        this.manageAdmitCardsForm.controls['attempt2'].setValue('')
        this.manageAdmitCardsForm.controls['attempt3'].setValue('');
        this.disableSubmit = false;
      }
    } else if (attempt == 2) {
      status = this.manageAdmitCardsForm.controls['attempt2'].value;
      if (status == 'F') {
        // this.enableAttempt3 = true;
        this.disableSubmit = true;
      } else {
        // this.enableAttempt3 = false;
        this.manageAdmitCardsForm.controls['attempt3'].setValue('');
        this.disableSubmit = false;
      }
    } else if (attempt == 3) {
      this.disableSubmit = false;
      status = this.manageAdmitCardsForm.controls['attempt3'].value;
    } else {
      status = false;
    }

    // if (this.enableAttempt2 == true) {
    //   if (this.manageAdmitCardsForm.controls['attempt2'].value) {
    //     this.disableSubmit = true;
    //   } else {
    //     this.disableSubmit = false;
    //   }
    // }

    // if (this.enableAttempt3 == true) {
    //   if (this.manageAdmitCardsForm.controls['attempt3'].value) {
    //     this.disableSubmit = true;
    //   } else {
    //     this.disableSubmit = false;
    //   }
    // }
    this.status = status;
    console.log('STATUS ', status)
  }


  // confirmation(status) {
  //   // this.status = status;
  //   this.openmd(this.consentPopUp);
  // }

  confirmation(attempt) {
    console.log('confirmation', attempt)
    // this.status = status;
    if (attempt == 1) {
      if (this.manageAdmitCardsForm.controls['attempt1'].value) {
        this.attemptNo = attempt;
        this.openmd(this.consentPopUp, attempt);
      } else {
        this.sharedService.showWarning('Please mark status')
      }
    } else if (attempt == 2) {
      if (this.manageAdmitCardsForm.controls['attempt2'].value) {
        this.attemptNo = attempt;
        this.openmd(this.consentPopUp, attempt);
      } else {
        this.sharedService.showWarning('Please mark status')
      }
    } else if (attempt == 3) {
      if (this.manageAdmitCardsForm.controls['attempt3'].value) {
        this.attemptNo = attempt;
        this.openmd(this.consentPopUp, attempt);
      } else {
        this.sharedService.showWarning('Please mark status')
      }
    }
    // else {
    //   this.sharedService.showWarning('Please mark status')
    // }

  }

  doubleConfirm() {
    this.openmd(this.secondConsentPopUp, this.attemptNo);
  }

  openmd(content, attempt) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'first consent') {
        this.doubleConfirm();
      } else if (result == 'second consent') {
        this.updatePet();
      } else if (result == 'Save click') {
        // if (this.usedFor == '1') {
        this.markStatus();
        // }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  updatePet() {
    console.log('Attempt ', this.attemptNo)
    const reqObj = {
      action: 5,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      petDetails: {
        petBroadJump: {
          // highJumpStatus: this.status
          broadJumpStatusOne: null,
          broadJumpStatusTwo: null,
          broadJumpStatusThree: null
        }
      }
    };

    // tslint:disable-next-line:triple-equals
    if (this.attemptNo == '1') {
      reqObj.petDetails.petBroadJump.broadJumpStatusOne = this.manageAdmitCardsForm.controls['attempt1'].value;
      // this.enableAttempt2 = null;
      // this.enableAttempt3 = false;
      // this.enableAttempt1 = false;
    } else if (this.attemptNo == '2') {
      // this.enableAttempt3 = null;
      // this.enableAttempt2 = false;
      // this.enableAttempt1 = false;
      reqObj.petDetails.petBroadJump.broadJumpStatusTwo = this.manageAdmitCardsForm.controls['attempt2'].value;
    } else if (this.attemptNo == '3') {
      // this.enableAttempt3 = false;
      // this.enableAttempt2 = false;
      // this.enableAttempt1 = false;
      reqObj.petDetails.petBroadJump.broadJumpStatusThree = this.manageAdmitCardsForm.controls['attempt3'].value;
    }



    console.log('reqObj ', reqObj)
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.initializeForm();
          this.searchForm.controls['applicationNumber'].setValue('');
          this.sharedService.showSuccess(resp['body']['responseDesc'])
          this.photo = undefined;
          this.signature = undefined;
          this.enableForm = false;
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
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

  markStatus() {
    // this.remarksForm.reset(); 
    const reqObj = {
      action: 9,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      remarks: this.remarksForm.controls['remarks'].value || null
    };
    console.log('reqObj', reqObj)
    this.remarksForm.reset();
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc'])
          this.initializeForm();
          this.searchForm.controls['applicationNumber'].setValue('');
          this.photo = undefined;
          this.signature = undefined;
          this.enableForm = false;
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    });
  }

  markAbsent() {
    this.openmd(this.confFormPopUP, 1);
  }
}
