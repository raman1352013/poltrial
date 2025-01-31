import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.css']
})
export class HeightComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  @ViewChild('confFormPopUP') confFormPopUP;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  remarksForm: FormGroup;
  enableForm = false;
  qrResultString: string;
  enableScanner = false;
  photo: any;
  signature: any;
  feetArray = [];
  inchesArray = [];
  response;
  closeResult;
  heightMeasure = {
    heightFeetQa: null,
    heightInchesQa: null
  };
  candidateQualified = false;
  inches: any;
  feet: any;
  status: any;
  submitApplicationForm = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    for (let i = 0; i < 8; i++) {
      this.feetArray.push({ feet: i + 1 });
    }

    for (let j = -1; j < 11; j++) {
      // this.inchesArray.push({ inches: 0 });
      this.inchesArray.push({ inches: j + 1 });
    }
    this.initializeForm();
    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 5 && resp.id !== 3) {
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
      feet: new FormControl('', Validators.required),
      inches: new FormControl('', Validators.required),
      status: new FormControl(''),
      score: new FormControl(''),
      isGorkha: new FormControl(''),
    });

    this.remarksForm = new FormGroup({
      remarks: new FormControl('', Validators.required)
    })
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
    // this.initializeForm();
    this.getApplicationSubmitted(this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('P', this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('S', this.searchForm.controls['applicationNumber'].value);
  }

  getApplicationSubmitted(application) {
    // Reset Application and result
    // this.photo = undefined;
    // this.signature = undefined;
    // this.enableForm = false;
    // this.manageAdmitCardsForm.controls['feet'].setValue('');
    // this.manageAdmitCardsForm.controls['inches'].setValue('');
    // this.status = undefined;
    // this.manageAdmitCardsForm.controls['score'].setValue('');

    // this.manageAdmitCardsForm.reset();


    // Get application details
    this.manageAdmitCardsForm.controls['feet'].setValue('');
    this.manageAdmitCardsForm.controls['inches'].setValue('');
    this.manageAdmitCardsForm.controls['status'].setValue('');
    this.manageAdmitCardsForm.controls['score'].setValue('');
    this.status = undefined;
    this.feet = undefined;
    this.inches = undefined;
    this.submitApplicationForm = false;
    this.applicationService.getApplicationSubmitted(application, 2).then((resp: any) => {
      this.enableScanner = false;
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          console.log('Resp', resp['body']['responseObject']);
          const response = resp['body']['responseObject'];
          this.response = resp['body']['responseObject'];
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
          this.manageAdmitCardsForm.controls['isGorkha'].setValue(response.isGorkha == 'Y' ? 'Yes' : 'No');
          this.heightMeasure = {
            heightFeetQa: response.petDetails ? response.petDetails.heightMinimum.heightFeetQa : null,
            heightInchesQa: response.petDetails ? response.petDetails.heightMinimum.heightInchesQa : null
          };
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

  getFeet() {
    this.feet = this.manageAdmitCardsForm.controls['feet'].value;
    this.inches = this.manageAdmitCardsForm.controls['inches'].value;
    let score;
    if (this.feet && this.inches) {
      const total = Number(this.feet) + Number(this.inches);
      if (Number(this.feet) > 4) {
        const requiredHeight = this.heightMeasure.heightFeetQa + this.heightMeasure.heightInchesQa;
        console.log('TOTAL ', this.heightMeasure.heightFeetQa + this.heightMeasure.heightInchesQa)
        if (Number(this.feet) > 5) {
          this.candidateQualified = true;
        } else {
          if (total < requiredHeight) {
            this.candidateQualified = false;
          } else {
            this.candidateQualified = true;
          }
        }
        if (this.response.genderId == 1) {
          if (Number(this.feet) > 5) {
            score = 5;
          } else {
            if (total < 7) {
              score = 0;
            } else if (total >= 7 && total < 8) {
              score = 1;
            } else if (total >= 8 && total < 9) {
              score = 2;
            } else if (total >= 9 && total < 10) {
              score = 3;
            } else if (total >= 10 && total < 11) {
              score = 4;
            } else if (total >= 11) {
              score = 5;
            }
          }
        } else if (this.response.genderId == 2) {
          if (Number(this.feet) > 5) {
            score = 5;
          } else {
            if (total < 12) {
              score = 0;
            } else if (total >= 12 && total < 13) {
              score = 1;
            } else if (total >= 13 && total < 14) {
              score = 2;
            } else if (total >= 14 && total < 15) {
              score = 3;
            } else if (total >= 15 && total < 16) {
              score = 4;
            } else if (total >= 16) {
              score = 5;
            }
          }
        }
      } else {
        score = 0;
        this.candidateQualified = false;
      }
      console.log('total', total)
      if (this.candidateQualified == true) {
        this.status = 'Qualified'
      } else {
        this.status = 'Not Qualified'
      }
      console.log(' this.status ', this.status)
      //  : 
      // this.manageAdmitCardsForm.controls['status'].setValue(this.candidateQualified == true ? 'Qualified' : 'Not Qualified')
      this.manageAdmitCardsForm.controls['score'].setValue(score)
    }

    console.log('score', score)
    console.log('candidateQualified', this.candidateQualified)
  }

  getInches() {
    this.feet = this.manageAdmitCardsForm.controls['feet'].value;
    this.inches = this.manageAdmitCardsForm.controls['inches'].value;
    let score;
    if (this.feet && this.inches) {
      const total = Number(this.feet) + Number(this.inches);
      if (Number(this.feet) > 4) {
        const requiredHeight = this.heightMeasure.heightFeetQa + this.heightMeasure.heightInchesQa;
        console.log('TOTAL ', this.heightMeasure.heightFeetQa + this.heightMeasure.heightInchesQa)
        if (Number(this.feet) > 5) {
          this.candidateQualified = true;
        } else {
          if (total < requiredHeight) {
            this.candidateQualified = false;
          } else {
            this.candidateQualified = true;
          }
        }

        if (this.response.genderId == 1) {
          if (Number(this.feet) > 5) {
            score = 5;
          } else {
            if (total < 7) {
              score = 0;
            } else if (total >= 7 && total < 8) {
              score = 1;
            } else if (total >= 8 && total < 9) {
              score = 2;
            } else if (total >= 9 && total < 10) {
              score = 3;
            } else if (total >= 10 && total < 11) {
              score = 4;
            } else if (total >= 11) {
              score = 5;
            }
          }

        } else if (this.response.genderId == 2) {
          if (Number(this.feet) > 5) {
            score = 5;
          } else {
            if (total < 12) {
              score = 0;
            } else if (total >= 12 && total < 13) {
              score = 1;
            } else if (total >= 13 && total < 14) {
              score = 2;
            } else if (total >= 14 && total < 15) {
              score = 3;
            } else if (total >= 15 && total < 16) {
              score = 4;
            } else if (total >= 16) {
              score = 5;
            }
          }

        }
      } else {
        score = 0;
        this.candidateQualified = false;
      }
      console.log('total', total)
      if (this.candidateQualified == true) {
        this.status = 'Qualified'
      } else {
        this.status = 'Not Qualified'
      }
      // this.manageAdmitCardsForm.controls['status'].setValue(this.candidateQualified == true ? 'Qualified' : 'Not Qualified')
      this.manageAdmitCardsForm.controls['score'].setValue(score)
    }

    console.log('score', score)
    console.log('candidateQualified', this.candidateQualified)
  }


  scanQr() {
    this.enableScanner = true;
  }

  clearResult(): void {
    this.qrResultString = null;
  }


  confirmation() {
    const feet = this.manageAdmitCardsForm.controls['feet'].value;
    const inches = this.manageAdmitCardsForm.controls['inches'].value;
    this.submitApplicationForm = true;
    if (feet && inches) {
      this.openmd(this.consentPopUp);
    } else {
      this.sharedService.showWarning('Please complete the form');
    }

  }

  openmd(content) {
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

  doubleConfirm() {
    this.openmd(this.secondConsentPopUp);
  }

  updatePet() {
    const reqObj = {
      action: 2,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      petDetails: {
        petHeights: {
          heightExamStatus: this.candidateQualified == true ? 'P' : 'F',
          heightFeet: Number(this.manageAdmitCardsForm.controls['feet'].value),
          heightFeetQa: this.heightMeasure.heightFeetQa,
          heightInches: Number(this.manageAdmitCardsForm.controls['inches'].value),
          heightInchesQa: this.heightMeasure.heightInchesQa,
          heightMarks: Number(this.manageAdmitCardsForm.controls['score'].value)
        }
      }
    };
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
    this.openmd(this.confFormPopUP);
  }
}
