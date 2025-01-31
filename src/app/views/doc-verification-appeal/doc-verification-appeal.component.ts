import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { splitAtColon } from '@angular/compiler/src/util';


@Component({
  selector: 'app-doc-verification-appeal',
  templateUrl: './doc-verification-appeal.component.html',
  styleUrls: ['./doc-verification-appeal.component.css']
})
export class DocVerificationAppealComponent implements OnInit {

  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  @ViewChild('confFormPopUP') confFormPopUP;

  manageAdmitCardsForm: FormGroup;
  generateAdmitCardForm: FormGroup;
  generateAdmitCard2Form: FormGroup;
  generateAdmitCard3Form: FormGroup;
  generateAdmitCard4Form: FormGroup;
  searchForm: FormGroup;
  heightForm: FormGroup;
  chestForm: FormGroup;
  raceForm: FormGroup;
  heighJumpForm: FormGroup;
  broadJumpForm: FormGroup;
  drivingForm: FormGroup;
  driverForm: FormGroup;
  consentRemarks: FormGroup;
  qrResultString: string;
  enableScanner = false;
  enableForm = false;
  disableCalculation = false;
  candidateQualified = false;
  photo: any;
  signature: any;
  chestMeasure = {}
  closeResult: string;
  response: any;
  inchesA;
  inchesB;
  inches: any;
  feet: any;
  drivingMarksArray = [];
  status;
  heightInchesArray = [];
  feetArray = [];
  inchesArray = [];
  heightMeasure = {
    heightFeetQa: null,
    heightInchesQa: null
  };
  heightButton = true;
  chestButton = true;
  raceButtonEdit = true;
  heighJumpButtonEdit = true;
  broadJumpButtonEdit = true;

  heighJumpFormSubmit = false;
  broadJumpFormSubmit = false;
  raceFormSubmit = false;
  chestFormSubmit = false;
  heightFormSubmit = false;
  driverStatus: any;
  submitApplicationForm = false;
  submitApplication2Form = false;
  submitApplication3Form = false;
  enableBkdaRemarks: boolean = false;
  enableLandlessRemarks: boolean = false;
  enableGenerateAdmitCard: boolean = false;
  enableGenerateAdmit2Card: boolean = false;;
  enableGenerateAdmit3Card: boolean = false;;
  enableGenerateAdmit4Card: boolean = false;;
  submitApplication4Form = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {

    

    for (let i = 0; i < 8; i++) {
      this.feetArray.push({ feet: i + 1 });
    }

    for (let j = -1; j < 11; j++) {
      // this.inchesArray.push({ inches: 0 });
      this.heightInchesArray.push({ inches: j + 1 });
    }

    for (let j = 19; j < 45; j++) {
      this.inchesArray.push({ inches: j + 1 });
    }

    for (let j = 0; j < 45; j++) {
      this.drivingMarksArray.push({ mark: j + 1 });
    }
    this.initializeForm();
    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 21) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
        }
      }
    });
  }



  initializeForm() {
    this.searchForm = new FormGroup({
      applicationNumber: new FormControl(''),
    });

    this.consentRemarks = new FormGroup({
      remarks: new FormControl('', Validators.required),
    });

    this.heightForm = new FormGroup({
      feet: new FormControl(''),
      inches: new FormControl(''),
      result: new FormControl(''),
      score: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      heightExamDate: new FormControl(''),
    });

    this.generateAdmitCardForm = new FormGroup({
      backward: new FormControl('', Validators.required),
      landless: new FormControl('', Validators.required),
      bkdaEvaluationMarks: new FormControl(''),
      landlessEvaluationMarks: new FormControl(''),
       bkdaRemarks: new FormControl(''),
      landlessRemarks: new FormControl(''),
    })

    this.generateAdmitCard2Form = new FormGroup({
      maximumMarks: new FormControl('', Validators.required),
      marksScored: new FormControl('', Validators.required),
      eduMarksInPercentage: new FormControl(''),
      eduEvaluationMarks:  new FormControl(''),
    });

    this.generateAdmitCard3Form = new FormGroup({
      license: new FormControl('', Validators.required),
      marksScored: new FormControl(''),
      remarks: new FormControl(''),
    })

    this.generateAdmitCard4Form = new FormGroup({ 
      nssEvaluation: new FormControl('', Validators.required),
      nssEvaluationMarks: new FormControl('', Validators.required),
      nccEvaluation: new FormControl('', Validators.required),
      nccEvaluationMarks: new FormControl('', Validators.required),
      scoutEvaluation: new FormControl('', Validators.required),
      scoutEvaluationMarks: new FormControl('', Validators.required),
      nssNccEvaluationMarks: new FormControl('', Validators.required),
      nssNccRemarks:  new FormControl('', Validators.required),
      isSports:  new FormControl('', Validators.required),
      sportsEvaluationMarks: new FormControl(''),
      isMdw:  new FormControl('', Validators.required),
      mdwEvaluationMarks: new FormControl(''),
    })

    this.chestForm = new FormGroup({
      chestA: new FormControl(''),
      chestB: new FormControl(''),
      result: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      chestExamDate: new FormControl(''),
    });

    this.raceForm = new FormGroup({
      status: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      raceExamDate: new FormControl('')
    });

    this.heighJumpForm = new FormGroup({
      highJumpStatusOne: new FormControl(''),
      highJumpStatusTwo: new FormControl(''),
      highJumpStatusThree: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      highJumpDate: new FormControl('')
    });

    this.broadJumpForm = new FormGroup({
      broadJumpStatusOne: new FormControl(''),
      broadJumpStatusTwo: new FormControl(''),
      broadJumpStatusThree: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      broadJumpDate: new FormControl('')
    });

    this.drivingForm = new FormGroup({
      status: new FormControl(''),
      remarks: new FormControl('', Validators.required),
      driverExamDate: new FormControl('')
    });

    this.driverForm = new FormGroup({
      status: new FormControl(''),
      marks: new FormControl(''),
      remarks: new FormControl('', Validators.required)
    });



    this.manageAdmitCardsForm = new FormGroup({
      heightMarks: new FormControl(''),
      examMarks: new FormControl(''),
      scrutinyVenue: new FormControl(''),
      scrutinyDate: new FormControl(''),
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
      marks: new FormControl(''),
      // chestB: new FormControl(''),
      status: new FormControl(''),
      isGorkha: new FormControl(''),
    });
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
    this.generateAdmitCardForm.disable()
    this.generateAdmitCard2Form.disable()
    this.generateAdmitCard3Form.disable()
    this.generateAdmitCard4Form.disable()

    this.enableScanner = false;
    this.applicationService.getApplicationScrutiny(application, 6).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          console.log('Resp', resp['body']['responseObject']);
          this.response = resp['body']['responseObject']
          const response = resp['body']['responseObject'];
          let postDesc;
          if (response.postAppliedFor == 'G') {
            postDesc = 'General Duty'
          } else {
            postDesc = 'Driver'
          }
          this.enableForm = true;
          this.manageAdmitCardsForm.controls['applicationNo'].setValue(response.applicationNo);
          this.manageAdmitCardsForm.controls['heightMarks'].setValue(response.heightMarks);
          this.manageAdmitCardsForm.controls['examMarks'].setValue(response.examMarks);
          this.manageAdmitCardsForm.controls['scrutinyVenue'].setValue(response.scrutinyVenue);
          this.manageAdmitCardsForm.controls['scrutinyDate'].setValue(response.scrutinyDate);
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
          // this.chestMeasure = response.petDetails ? response.petDetails.chestMinimum.message : null;
          this.applicationService.getImageV2('P', response.applicationId).then((photo: any) => {
            const objectURL = URL.createObjectURL(photo);
            this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          this.applicationService.getImageV2('S', response.applicationId).then((sig: any) => {
            const objectURL = URL.createObjectURL(sig);
            this.signature = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          if (response.genderId == '1') {
            this.disableCalculation = true;
          } else {
            this.disableCalculation = false;
          }


        let scrutinyDetails = response.scrutinyDetails
        let isBkda = '0';
        if(scrutinyDetails.isBkda == 'Y') {
          isBkda = '1';
        } else {
          isBkda = '0';
        }
        let landless = '0';
        if(scrutinyDetails.isLandless == 'Y') {
          landless = '1';
        } else {
          landless = '0';
        }

        let isLmv = '0';
        if(scrutinyDetails.isLmv == 'Y') {
          isLmv = '1.5'
        } else {
          isLmv = '0'
        }
        this.generateAdmitCardForm.controls['backward'].setValue(isBkda)
        this.generateAdmitCardForm.controls['bkdaEvaluationMarks'].setValue(scrutinyDetails.bkdaEvaluationMarks)
        this.generateAdmitCardForm.controls['bkdaRemarks'].setValue(scrutinyDetails.bkdaRemarks)
        this.generateAdmitCardForm.controls['landless'].setValue(landless)
        this.generateAdmitCardForm.controls['landlessEvaluationMarks'].setValue(scrutinyDetails.landlessEvaluationMarks)

        this.generateAdmitCard2Form.controls['maximumMarks'].setValue(scrutinyDetails.eduMaxMarks)
        this.generateAdmitCard2Form.controls['marksScored'].setValue(scrutinyDetails.eduMarksScore)
        this.generateAdmitCard2Form.controls['eduMarksInPercentage'].setValue(scrutinyDetails.eduMarksInPercentage)
        this.generateAdmitCard2Form.controls['eduEvaluationMarks'].setValue(scrutinyDetails.eduEvaluationMarks)

        this.generateAdmitCard3Form.controls['license'].setValue(isLmv);
        this.generateAdmitCard3Form.controls['marksScored'].setValue(scrutinyDetails.lmvEvaluationMarks);
        this.generateAdmitCard3Form.controls['remarks'].setValue(scrutinyDetails.lmvRemarks);


        // let isLmv = '0';
        // if(scrutinyDetails.isLmv == 'Y') {
        //   isLmv = '1.5'
        // } else {
        //   isLmv = '0'
        // }

        
        const splittedArray = scrutinyDetails.nssNccStr.split('|')
        console.log('splittedArray ', splittedArray)
        let nss = splittedArray[0].split('-')
        let ncc = splittedArray[1].split('-')
        let bScout = splittedArray[2].split('-')
        console.log('nss' , nss[1])
        console.log('ncc' , ncc[1])
        console.log('bScout' , bScout[1])

        let isSports;
        if(scrutinyDetails.isSports == 'Y') {
          isSports = 1
        }
        this.generateAdmitCard4Form.controls['nssEvaluation'].setValue(nss[1]+'');
        this.generateAdmitCard4Form.controls['nssEvaluationMarks'].setValue(nss[1]);
        this.generateAdmitCard4Form.controls['nccEvaluation'].setValue(ncc[1]+'');
        this.generateAdmitCard4Form.controls['nccEvaluationMarks'].setValue(ncc[1]);
        this.generateAdmitCard4Form.controls['scoutEvaluation'].setValue(bScout[1]+'');
        this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].setValue(bScout[1]);
        this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(scrutinyDetails.nssNccEvaluationMarks);
        this.generateAdmitCard4Form.controls['nssNccRemarks'].setValue(scrutinyDetails.nssNccRemarks);
        this.generateAdmitCard4Form.controls['isSports'].setValue(scrutinyDetails.sportsEvaluationMarks + '');
        this.generateAdmitCard4Form.controls['sportsEvaluationMarks'].setValue(scrutinyDetails.sportsEvaluationMarks);
        this.generateAdmitCard4Form.controls['isMdw'].setValue(scrutinyDetails.mdwEvaluationMarks + '');
        this.generateAdmitCard4Form.controls['mdwEvaluationMarks'].setValue(scrutinyDetails.mdwEvaluationMarks);


        } else {
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }

        
        // this.petResult(application);
      }
    });
  }

  petResult(application) {
    this.applicationService.petResult(application).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          console.log('petResult' + JSON.stringify(resp['body']['responseObject']));
          const result = resp['body']['responseObject'];
          this.heightForm.controls['feet'].setValue(result.petHeights.heightFeet);
          this.heightForm.controls['inches'].setValue(result.petHeights.heightInches)
          this.heightForm.controls['score'].setValue(result.petHeights.heightMarks)
          this.heightForm.controls['result'].setValue(result.petHeights.heightExamStatus == 'P' ? 'Qualified' : 'Not Qualified')
          if (result.petHeights.heightExamDate) {
            this.heightForm.controls['heightExamDate'].setValue(result.petHeights.heightExamDate)
          }



          this.chestForm.controls['chestA'].setValue(result.petChest.chestA);
          this.chestForm.controls['chestB'].setValue(result.petChest.chestB)
          this.chestForm.controls['result'].setValue(result.petChest.chestExamStatus == 'P' ? 'Qualified' : 'Not Qualified')
          if (result.petChest.chestExamDate) {
            const date =
              this.chestForm.controls['chestExamDate'].setValue(result.petChest.chestExamDate)
          }


          this.raceForm.controls['status'].setValue(result.petRace.raceExamStatus);

          if (result.petRace.raceExamDate) {
            this.raceForm.controls['raceExamDate'].setValue(result.petRace.raceExamDate);
          }
          this.heighJumpForm.controls['highJumpStatusOne'].setValue(result.petJump.highJumpStatusOne);
          this.heighJumpForm.controls['highJumpStatusTwo'].setValue(result.petJump.highJumpStatusTwo);
          this.heighJumpForm.controls['highJumpStatusThree'].setValue(result.petJump.highJumpStatusThree);
          if (result.petJump.highJumpDate) {
            this.heighJumpForm.controls['highJumpDate'].setValue(result.petJump.highJumpDate);
          }


          this.broadJumpForm.controls['broadJumpStatusOne'].setValue(result.petBroadJump.broadJumpStatusOne);
          this.broadJumpForm.controls['broadJumpStatusTwo'].setValue(result.petBroadJump.broadJumpStatusTwo);
          this.broadJumpForm.controls['broadJumpStatusThree'].setValue(result.petBroadJump.broadJumpStatusThree);
          if (result.petBroadJump.broadJumpDate) {
            this.broadJumpForm.controls['broadJumpDate'].setValue(result.petBroadJump.broadJumpDate);
          }

          this.driverForm.controls['marks'].setValue(result.petDriver.driverExamMarks);
          if (result.petDriver.driverExamMarks) {
            if (result.petDriver.driverExamStatus == 'P') {
              this.driverStatus = 'Qualified';
            } else {
              this.driverStatus = 'Not Qualified';
            }
          }


          this.heightForm.disable();
          console.log('this.chestForm.disable() ', this.chestForm.disable())
          this.chestForm.disable();
          this.raceForm.disable();
          this.heighJumpForm.disable();
          this.broadJumpForm.disable();
          this.driverForm.disable();
        }
      }
    });
  }


  getFeet() {
    this.feet = this.heightForm.controls['feet'].value;
    this.inches = this.heightForm.controls['inches'].value;
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
      console.log('score', score)
      console.log('candidateQualified', this.candidateQualified)

      if (this.candidateQualified == true) {
        this.heightForm.controls['result'].setValue('Qualified');
        // this.status = 'Qualified'
      } else {
        // this.status = 'Not Qualified'
        this.heightForm.controls['result'].setValue('Not Qualified');
      }

      //  : 
      // this.manageAdmitCardsForm.controls['status'].setValue(this.candidateQualified == true ? 'Qualified' : 'Not Qualified')
      this.heightForm.controls['score'].setValue(score)
    }
  }

  getInches() {
    this.feet = this.heightForm.controls['feet'].value;
    this.inches = this.heightForm.controls['inches'].value;
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
      console.log('score', score)
      console.log('candidateQualified', this.candidateQualified)

      if (this.candidateQualified == true) {
        // this.status = 'Qualified'
        this.heightForm.controls['result'].setValue('Qualified');
      } else {
        // this.status = 'Not Qualified'
        this.heightForm.controls['result'].setValue('Not Qualified');
      }
      // this.manageAdmitCardsForm.controls['status'].setValue(this.candidateQualified == true ? 'Qualified' : 'Not Qualified')
      this.heightForm.controls['score'].setValue(score)
    }
  }


  getInchesA() {
    if (this.chestForm.controls['chestA'].value && this.chestForm.controls['chestB'].value) {
      if (this.response && this.response.petDetails && this.response.petDetails.chestMinimum) {
        if (this.chestForm.controls['chestA'].value >= this.response.petDetails.chestMinimum.chestQa && this.chestForm.controls['chestB'].value >= this.response.petDetails.chestMinimum.chestQb) {
          this.chestForm.controls['result'].setValue('Qualified');
          // this.status = 'Qualified';
        } else {
          this.chestForm.controls['result'].setValue('Not Qualified');
          // this.status = 'Not Qualified';
        }
      }
    }
  }

  getInchesB() {
    if (this.chestForm.controls['chestA'].value && this.chestForm.controls['chestB'].value) {
      if (this.response && this.response.petDetails && this.response.petDetails.chestMinimum) {
        if (this.chestForm.controls['chestA'].value >= this.response.petDetails.chestMinimum.chestQa && this.chestForm.controls['chestB'].value >= this.response.petDetails.chestMinimum.chestQb) {
          this.chestForm.controls['result'].setValue('Qualified');
          // this.status = 'Qualified';
        } else {
          this.chestForm.controls['result'].setValue('Not Qualified');
          // this.status = 'Not Qualified';
        }
      }
    }
  }


  editHeight() {
    this.heightForm.enable();
    this.heightButton = false;

    this.chestForm.disable();
    this.heighJumpForm.disable();
    this.broadJumpForm.disable();
    this.raceForm.disable();
    this.chestButton = true;
    this.heighJumpButtonEdit = true;
    this.broadJumpButtonEdit = true;
    this.raceButtonEdit = true;
  }

  editChest() {
    this.chestForm.enable();
    this.chestButton = false;
    this.heightForm.disable();
    this.heighJumpForm.disable();
    this.broadJumpForm.disable();
    this.raceForm.disable();

    this.heightButton = true;
    this.heighJumpButtonEdit = true;
    this.broadJumpButtonEdit = true;
    this.raceButtonEdit = true;
  }

  editHighJump() {
    this.heighJumpForm.enable();
    this.heighJumpButtonEdit = false;

    this.heightForm.disable();
    this.chestForm.disable();
    this.broadJumpForm.disable();
    this.raceForm.disable();

    this.heightButton = true;
    this.chestButton = true;
    this.broadJumpButtonEdit = true;
    this.raceButtonEdit = true;
  }

  editBroadJump() {
    this.broadJumpForm.enable();
    this.broadJumpButtonEdit = false;

    this.heightForm.disable();
    this.chestForm.disable();
    this.heighJumpForm.disable();
    this.raceForm.disable();

    this.heightButton = true;
    this.chestButton = true;
    this.heighJumpButtonEdit = true;
    this.raceButtonEdit = true;
  }

  editRace() {
    this.raceForm.enable();
    this.raceButtonEdit = false;

    this.heightForm.disable();
    this.chestForm.disable();
    this.heighJumpForm.disable();
    this.broadJumpForm.disable();

    this.heightButton = true;
    this.chestButton = true;
    this.heighJumpButtonEdit = true;
    this.broadJumpButtonEdit = true;
  }

  // updateHeightConfirmation() {
  //   this.heightFormSubmit = true;
  //   if (this.heightForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }
  // }

  // updateChestConfirmation() {
  //   this.chestFormSubmit = true;
  //   if (this.chestForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }
  // }

  // updateRaceConfirmation() {
  //   this.raceFormSubmit = true;
  //   if (this.raceForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }
  // }

  // updateHighJumpConfirmation() {
  //   this.heighJumpFormSubmit = true;
  //   if (this.heighJumpForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }
  // }

  // updateBroadJumpConfirmation() {
  //   this.broadJumpFormSubmit = true;
  //   if (this.broadJumpForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }
  // }


  // openmd(content) {
  //   this.modalService.open(content, {
  //     ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
  //     keyboard: false
  //   }).result.then((result) => {
  //     if (result == 'first consent') {
  //       console.log('first consent')
  //       this.doubleConfirm();
  //     } else if (result == 'second consent') {
  //       this.submitApplication();
  //     } else if (result == 'Save click') {
  //       // if (this.usedFor == '1') {
  //       // this.markStatus();
  //       // }
  //     }
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  doubleConfirm(order) {
    this.openmd(this.confFormPopUP, order);
  }


  // updateHeight() {
  //   this.heightForm.disable();
  //   this.heightButton = true;
  // }

  updateHeight() {
    const reqObj = {
      action: 2,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'ADMIN',
      petDetails: {
        petHeights: {
          heightExamStatus: this.candidateQualified == true ? 'P' : 'F',
          heightFeet: Number(this.heightForm.controls['feet'].value),
          heightFeetQa: Number(this.response.heightMinimum.heightFeetQa),
          heightInches: Number(this.heightForm.controls['inches'].value),
          heightInchesQa: Number(this.response.heightMinimum.heightInchesQa),
          heightMarks: Number(this.heightForm.controls['score'].value),
          remarks: this.heightForm.controls['remarks'].value
        }
      }
    };

    console.log('reqObj ', reqObj)
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.heightFormSubmit = false;
          this.heightForm.disable();
          this.heightButton = true;
          // this.initializeForm();
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

  // updateChest() {
  //   this.chestForm.disable();
  //   this.chestButton = true;
  // }


  updateChest() {
    this.chestForm.disable();
    this.chestButton = true;
    const reqObj = {
      action: 3,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'ADMIN',
      petDetails: {
        petChest: {
          chestQa: Number(this.response.chestMinimum.chestQa),
          chestQb: Number(this.response.chestMinimum.chestQb),
          chestA: Number(this.chestForm.controls['chestA'].value),
          chestB: Number(this.chestForm.controls['chestB'].value),
          chestExamStatus: this.chestForm.controls['result'].value == 'Qualified' ? 'P' : 'F',
          remarks: this.chestForm.controls['remarks'].value
        }
      }
    };
    console.log('updateChest ', reqObj)
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.chestFormSubmit = false;
          this.chestForm.disable();
          this.chestButton = true;
          this.searchForm.controls['applicationNumber'].setValue('');
          this.sharedService.showSuccess(resp['body']['responseDesc'])
          this.photo = undefined;
          this.signature = undefined;
          this.status = undefined;
          this.enableForm = false;
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    });
  }

  // updateRace() {
  //   this.raceForm.disable();
  //   this.raceButtonEdit = true;
  // }

  updateRace() {
    const reqObj = {
      action: 6,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'ADMIN',
      petDetails: {
        petRace: {
          raceExamStatus: this.raceForm.controls['status'].value,
          remarks: this.raceForm.controls['remarks'].value
        }
      }
    };
    console.log('updateRace ', reqObj)
    this.raceForm.disable();
    this.raceButtonEdit = true;
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.raceFormSubmit = false;
          this.initializeForm();
          this.searchForm.controls['applicationNumber'].setValue('');
          this.sharedService.showSuccess(resp['body']['responseDesc'])
          this.photo = undefined;
          this.signature = undefined;
          this.status = undefined;
          this.enableForm = false;
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    });
  }

  // updateHighJump() {
  //   this.heighJumpForm.disable();
  //   this.heighJumpButtonEdit = true;
  // }




  updateHighJump() {
    this.heighJumpForm.disable();
    this.heighJumpButtonEdit = true;
    const reqObj = {
      action: 4,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'ADMIN',
      petDetails: {
        petJump: {
          highJumpStatusOne: this.heighJumpForm.controls['highJumpStatusOne'].value || null,
          highJumpStatusTwo: this.heighJumpForm.controls['highJumpStatusTwo'].value || null,
          highJumpStatusThree: this.heighJumpForm.controls['highJumpStatusThree'].value || null,
          remarks: this.heighJumpForm.controls['remarks'].value
        }
      }
    }
    console.log('reqObj ', reqObj)
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.heighJumpFormSubmit = false;
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

  // updateBroadJump() {
  //   this.broadJumpForm.disable();
  //   this.broadJumpButtonEdit = true;
  // }

  updateBroadJump() {
    this.broadJumpForm.disable();
    this.broadJumpButtonEdit = true;
    const reqObj = {
      action: 5,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'ADMIN',
      petDetails: {
        petBroadJump: {
          // highJumpStatus: this.status
          broadJumpStatusOne: this.broadJumpForm.controls['broadJumpStatusOne'].value || null,
          broadJumpStatusTwo: this.broadJumpForm.controls['broadJumpStatusTwo'].value || null,
          broadJumpStatusThree: this.broadJumpForm.controls['broadJumpStatusThree'].value || null,
          remarks: this.broadJumpForm.controls['remarks'].value
        }
      }
    };
    console.log('updateBroadJump ', reqObj)
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.broadJumpFormSubmit = false;
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

  selectBackward(event) {
    const backward = this.generateAdmitCardForm.controls['backward'].value;
    console.log('backward' , backward)
    this.generateAdmitCardForm.controls['bkdaEvaluationMarks'].setValue(backward)
    this.generateAdmitCardForm.controls['bkdaRemarks'].setValue('')
    if(backward == 1) {
      this.enableBkdaRemarks = true;
      this.generateAdmitCardForm.controls['bkdaRemarks'].setValidators(Validators.required);
      this.generateAdmitCardForm.controls['bkdaRemarks'].updateValueAndValidity()
    } else {
      this.enableBkdaRemarks = false;
      this.generateAdmitCardForm.controls['bkdaRemarks'].clearValidators();
      this.generateAdmitCardForm.controls['bkdaRemarks'].updateValueAndValidity()
    }
  }

  selectLandless() {
    const landless = this.generateAdmitCardForm.controls['landless'].value
    console.log('backward' , landless);
    this.generateAdmitCardForm.controls['landlessEvaluationMarks'].setValue(landless)
    this.generateAdmitCardForm.controls['landlessRemarks'].setValue('')
    if(landless == 1) {
      this.enableLandlessRemarks = true;
      this.generateAdmitCardForm.controls['landlessRemarks'].setValidators(Validators.required);
      this.generateAdmitCardForm.controls['landlessRemarks'].updateValueAndValidity()
    } else {
      this.enableLandlessRemarks = false;
      this.generateAdmitCardForm.controls['landlessRemarks'].clearValidators();
      this.generateAdmitCardForm.controls['landlessRemarks'].updateValueAndValidity()
    }
  }

  updateChestconfirmation() {

  }

  

  // submit() {
  //   this.submitApplicationForm = true;
  //   if(this.generateAdmitCardForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }  
    
  // }

  submitApplication() {
    this.submitApplicationForm = false

    let isBkda;
    if(this.generateAdmitCardForm.controls['backward'].value == 1) {
      isBkda = 'Y'
    } else {
      isBkda = 'N'
    }

    let landless;
    if(this.generateAdmitCardForm.controls['landless'].value == 1) {
      landless = 'Y'
    } else {
      landless = 'N'
    }

    let reqObj = {
      action: 3,
      rollNo: this.searchForm.controls['applicationNumber'].value,
      isBkda: isBkda,
      bkdaRemarks: this.generateAdmitCardForm.controls['bkdaRemarks'].value,
      bkdaEvaluationMarks: this.generateAdmitCardForm.controls['bkdaEvaluationMarks'].value,
      isLandless: landless,
      landlessEvaluationMarks: this.generateAdmitCardForm.controls['landlessEvaluationMarks'].value,
      landlessRemarks: this.generateAdmitCardForm.controls['landlessRemarks'].value,
      auditRemarks: this.consentRemarks.controls['remarks'].value,
      mode: 'ADMIN'
    }
    console.log('Reqobj ', reqObj)
    this.applicationService.updateScrutiny(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        this.submitApplicationForm = false;
        this.initializeForm();
        this.enableGenerateAdmitCard = !this.enableGenerateAdmitCard
        this.enableForm = false;
        if (resp['body']['responseCode'] == 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    })
  }

  editGenerateAdmitCard() {
    this.enableGenerateAdmitCard = true;
    this.generateAdmitCardForm.enable()

    this.enableGenerateAdmit2Card = false;
    this.enableGenerateAdmit3Card = false;
    this.enableGenerateAdmit4Card = false;

    this.generateAdmitCard2Form.disable()
    this.generateAdmitCard3Form.disable()
    this.generateAdmitCard4Form.disable()


  }

  hasLmvLic() {
    const license = this.generateAdmitCard3Form.controls['license'].value
    console.log('backward', license);
    this.generateAdmitCard3Form.controls['marksScored'].setValue(license)
  }


  submitConsentGenerateAdmitCard() {
    this.submitApplicationForm = true;
    if(this.generateAdmitCardForm.valid) {
      this.openmd(this.consentPopUp, 1)
    }  
  }

  submitConsentGenerateAdmit2Card() {
    this.submitApplication2Form = true;
    if(this.generateAdmitCard2Form.valid) {
      this.openmd(this.consentPopUp, 2)
    } 
  }

  submitConsentGenerateAdmit3Card() {
    this.submitApplication3Form = true;
    if(this.generateAdmitCard3Form.valid) {
      this.openmd(this.consentPopUp, 3)
    } 
  }

  submitConsentGenerateAdmit4Card() {
    this.submitApplication4Form = true;
    if(this.generateAdmitCard4Form.valid) {
      this.openmd(this.consentPopUp, 4)
    } 
  }

  submitGenerateAdmitCard() {
    this.enableGenerateAdmitCard = !this.enableGenerateAdmitCard
    this.generateAdmitCardForm.disable()
  }

  // submit() {
  //   this.submitApplicationForm = true;
  //   if(this.generateAdmitCardForm.valid) {
  //     this.openmd(this.consentPopUp)
  //   }  
    
  // }


  editGenerateAdmit2Card() {
    this.enableGenerateAdmit2Card = true;
    this.generateAdmitCard2Form.enable()

    this.enableGenerateAdmitCard = false;
    this.enableGenerateAdmit3Card = false;
    this.enableGenerateAdmit4Card = false;

    this.generateAdmitCardForm.disable()
    this.generateAdmitCard3Form.disable()
    this.generateAdmitCard4Form.disable()
  }

  submitGenerateAdmit2Card() {
    this.enableGenerateAdmit2Card = false;
    this.generateAdmitCard2Form.disable()

    this.submitApplicationForm = false
    let reqObj = {
      action: 2,
      rollNo: this.searchForm.controls['applicationNumber'].value || this.qrResultString,
      eduMaxMarks: this.generateAdmitCard2Form.controls['maximumMarks'].value,
      eduMarksScore: this.generateAdmitCard2Form.controls['marksScored'].value,
      eduMarksInPercentage: this.generateAdmitCard2Form.controls['eduMarksInPercentage'].value,
      eduEvaluationMarks: this.generateAdmitCard2Form.controls['eduEvaluationMarks'].value,
      auditRemarks: this.consentRemarks.controls['remarks'].value,
      mode: 'ADMIN'
    }
    console.log('Reqobj ', reqObj)
    this.applicationService.updateScrutiny(reqObj).then((resp: any) => {
      if(resp.status == 200) {
        this.submitApplicationForm = false;
        this.initializeForm();
        this.enableForm = false;
        if(resp['body']['responseCode'] == 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    })
  }

  editGenerateAdmit3Card() {
    this.enableGenerateAdmit3Card = true;
    this.generateAdmitCard3Form.enable()

    this.enableGenerateAdmitCard = false;
    this.enableGenerateAdmit2Card = false;
    this.enableGenerateAdmit4Card = false;

    this.generateAdmitCardForm.disable()
    this.generateAdmitCard2Form.disable()
    this.generateAdmitCard4Form.disable()
  }

  submitGenerateAdmit3Card() {
    this.enableGenerateAdmit3Card = false;
    this.generateAdmitCard3Form.disable()

    const license = this.generateAdmitCard3Form.controls['license'].value;
    let isLmv;
    if(license == '1.5') {
      isLmv = 'Y'
    } else {
      isLmv = 'N'
    }
    const reqObj = {
      action: 4,
      rollNo: this.searchForm.controls['applicationNumber'].value || this.qrResultString,
      isLmv: isLmv,
      lmvEvaluationMarks: this.generateAdmitCard3Form.controls['marksScored'].value,
      mode: 'ADMIN',
      lmvRemarks:  this.generateAdmitCard3Form.controls['remarks'].value,
      auditRemarks: this.consentRemarks.controls['remarks'].value,
    }

    console.log('reqObj ' , reqObj);
    this.applicationService.updateScrutiny(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        this.submitApplicationForm = false;
        this.initializeForm();
        this.enableForm = false;
        if (resp['body']['responseCode'] == 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    })
  }

  editGenerateAdmit4Card() {
    this.enableGenerateAdmit4Card = true;
    this.generateAdmitCard4Form.enable()

    this.enableGenerateAdmitCard = false;
    this.enableGenerateAdmit2Card = false;
    this.enableGenerateAdmit3Card = false;

    this.generateAdmitCardForm.disable()
    this.generateAdmitCard2Form.disable()
    this.generateAdmitCard3Form.disable()
  }

  submitGenerateAdmit4Card() {
    this.enableGenerateAdmit4Card = false;
    this.generateAdmitCard4Form.disable()

    let isSports;
    if(this.generateAdmitCard4Form.controls['isSports'].value != 0) {
      isSports = 'Y'
    } else {
      isSports = 'N'
    }

    let isMdw;
    if(this.generateAdmitCard4Form.controls['isMdw'].value == 1) {
      isMdw = 'Y'
    } else {
      isMdw = 'N'
    }

    for (let el in this.generateAdmitCard4Form.controls) {
      if (this.generateAdmitCard4Form.controls[el].errors) {
        console.log(el)
      }
 }  

    const reqObj = {
      action: 5,
      rollNo: this.searchForm.controls['applicationNumber'].value  || this.qrResultString,
      isNssNcc: 'Y',
      nssNccEvaluationMarks: this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].value,
      nssNccRemarks: this.generateAdmitCard4Form.controls['nssNccRemarks'].value,
      isSports: isSports,
      sportsEvaluationMarks: this.generateAdmitCard4Form.controls['isSports'].value,
      sportsRemarks: '',
      isMdw: isMdw,
      mdwEvaluationMarks: this.generateAdmitCard4Form.controls['mdwEvaluationMarks'].value,
      mdwRemarks: null,
      nssNccStr: 'nss-'+ this.generateAdmitCard4Form.controls['nssEvaluationMarks'].value + '|ncc-' +  this.generateAdmitCard4Form.controls['nccEvaluationMarks'].value + '|bscout-' +  this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].value,
      mode: 'ADMIN',
      auditRemarks: this.consentRemarks.controls['remarks'].value,
    }
    console.log('Reqobj ', reqObj)
    this.applicationService.updateScrutiny(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        this.submitApplicationForm = false;
        this.initializeForm();
        this.enableForm = false;
        if (resp['body']['responseCode'] == 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    })
  }

  marksScored(event) {
    console.log('event ' , event.target.value)
    const maximumMarks = Number(this.generateAdmitCard2Form.controls['maximumMarks'].value);
    const marksScored = Number(event.target.value)
    if(maximumMarks && marksScored) {
      if(maximumMarks > marksScored || maximumMarks == marksScored) {  
        const percentage = 100*marksScored/maximumMarks;
        const calculatedMarks = percentage*0.025
        this.generateAdmitCard2Form.controls['eduMarksInPercentage'].setValue(percentage.toFixed(3));
        let calMarks;
        if(calculatedMarks > 2.5) {
          calMarks = 2.5
        } else {
          calMarks = calculatedMarks
        }
        this.generateAdmitCard2Form.controls['eduEvaluationMarks'].setValue(calMarks.toFixed(3))
        console.log('percentage ' , percentage)
        console.log('calculatedMarks ' , calculatedMarks)
      } else {
        console.log('marksScored ' )
        this.generateAdmitCard2Form.controls['eduEvaluationMarks'].setValue('')
        this.generateAdmitCard2Form.controls['marksScored'].setValue('')
        this.generateAdmitCard2Form.controls['eduMarksInPercentage'].setValue('');
        this.generateAdmitCard2Form.controls['eduEvaluationMarks'].setValue('')
        this.sharedService.showWarning('Marks obtained can not be greater than maximum marks')
      }
    } else {
      if(marksScored == 0) {
        this.generateAdmitCard2Form.controls['eduMarksInPercentage'].setValue('');
        this.generateAdmitCard2Form.controls['eduEvaluationMarks'].setValue('')
      }
      console.log('0')
    }
  }

  openmd(content, order) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'first consent') {
        console.log('first consent')
        this.doubleConfirm(order);
      } else if (result == 'second consent') {
        if(order == 1) {
          this.submitApplication();
        } else if(order == 2) {
          this.submitGenerateAdmit2Card();
        } else if(order == 3) {
          this.submitGenerateAdmit3Card();
        }  else if(order == 4) {
          this.submitGenerateAdmit4Card();
        }
        
      } else if (result == 'Save click') {
        // if (this.usedFor == '1') {
        // this.markStatus();
        // }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectNss() {
    const isSports = this.generateAdmitCard4Form.controls['nssEvaluation'].value;
    console.log('isSports ' , isSports)
    this.generateAdmitCard4Form.controls['nssEvaluationMarks'].setValue(isSports)
    let totalMarks = 0;
    totalMarks =  Number(this.generateAdmitCard4Form.controls['nssEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['nccEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].value || 0) 
    if(totalMarks > 4) {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(4)
    } else {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(totalMarks)
    }
  }

  selectNcc() {
    const isSports = this.generateAdmitCard4Form.controls['nccEvaluation'].value;
    console.log('isSports ' , isSports)
    this.generateAdmitCard4Form.controls['nccEvaluationMarks'].setValue(isSports)
    let totalMarks = 0;
    totalMarks =  Number(this.generateAdmitCard4Form.controls['nssEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['nccEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].value || 0) 
    if(totalMarks > 4) {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(4)
    } else {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(totalMarks)
    }
  }

  selectIsScout() {
    const isSports = this.generateAdmitCard4Form.controls['scoutEvaluation'].value;
    console.log('isSports ' , isSports)
    this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].setValue(isSports)

    let totalMarks = 0;
    totalMarks =  Number(this.generateAdmitCard4Form.controls['nssEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['nccEvaluationMarks'].value || 0) + Number(this.generateAdmitCard4Form.controls['scoutEvaluationMarks'].value || 0) 
    if(totalMarks > 4) {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(4)
    } else {
      this.generateAdmitCard4Form.controls['nssNccEvaluationMarks'].setValue(totalMarks)
    }
  }

  medalWinner() {
    const isMdw = this.generateAdmitCard4Form.controls['isMdw'].value;
    this.generateAdmitCard4Form.controls['mdwEvaluationMarks'].setValue(isMdw)
  }

  selectIsSports() {
    const isSports = this.generateAdmitCard4Form.controls['isSports'].value;
    console.log('isSports ' , isSports)
    this.generateAdmitCard4Form.controls['sportsEvaluationMarks'].setValue(isSports)
    // if(isSports == 0) {

    // }
  }

  cancelGenerateAdmit2Card() {
    this.enableGenerateAdmit2Card = !this.enableGenerateAdmit2Card;
    this.generateAdmitCard2Form.disable()
  }

  cancelGenerateAdmit3Card() {
    this.enableGenerateAdmit3Card = !this.enableGenerateAdmit3Card
    this.generateAdmitCard3Form.disable()
  }

  cancelGenerateAdmit4Card() {
    this.enableGenerateAdmit4Card = !this.enableGenerateAdmit4Card
    this.generateAdmitCard4Form.disable()
  }
}
