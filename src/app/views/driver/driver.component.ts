import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  @ViewChild('confFormPopUP') confFormPopUP;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  remarksForm: FormGroup;
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
  submitApplicationForm = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    for (let j = 0; j < 45; j++) {
      // this.inchesArray.push({ inches: 0 });
      this.drivingMarksArray.push({ mark: j + 1 });
    }
    this.initializeForm();
    this.checkRole();
  }


  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 10 && resp.id !== 3) {
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
      marks: new FormControl('', Validators.required),
      // chestB: new FormControl(''),
      status: new FormControl(''),
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
    this.manageAdmitCardsForm.controls['marks'].setValue('');
    this.status = undefined;
    this.enableScanner = false;
    this.submitApplicationForm = false;
    this.applicationService.getApplicationSubmitted(application, 7).then((resp: any) => {
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
          this.chestMeasure = response.petDetails ? response.petDetails.chestMinimum.message : null;
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
        } else {
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }
      }
    });
  }

  getMark() {
    if (this.manageAdmitCardsForm.controls['marks'].value >= 22) {
      this.status = 'Qualified';
    } else {
      this.status = 'Not Qualified';
    }
  }

  // getInchesB() {
  //   if (this.manageAdmitCardsForm.controls['chestA'].value && this.manageAdmitCardsForm.controls['chestB'].value) {
  //     if (this.response && this.response.petDetails && this.response.petDetails.chestMinimum) {
  //       if (this.manageAdmitCardsForm.controls['chestA'].value >= this.response.petDetails.chestMinimum.chestQa && this.manageAdmitCardsForm.controls['chestB'].value >= this.response.petDetails.chestMinimum.chestQb) {
  //         this.manageAdmitCardsForm.controls['status'].setValue('Qualified');
  //         this.status = 'Qualified';
  //       } else {
  //         this.manageAdmitCardsForm.controls['status'].setValue('Not Qualified');
  //         this.status = 'Not Qualified';
  //       }
  //     }
  //   }
  // }

  confirmation() {
    // this.status = this.manageAdmitCardsForm.controls['status'].value;
    // this.inchesB = this.manageAdmitCardsForm.controls['chestB'].value;
    this.submitApplicationForm = true;
    if (this.manageAdmitCardsForm.controls['marks'].value) {
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
      action: 7,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      petDetails: {
        petDriver: {
          driverExamStatus: this.status == 'Qualified' ? 'P' : 'F',
          driverExamMarks: this.manageAdmitCardsForm.controls['marks'].value,
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
          this.status = undefined;
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
