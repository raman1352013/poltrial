import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared/shared.service';
import { JsService } from '../../services/js/js.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondPopUp') secondPopUp;
  @ViewChild('confFormPopUP') confFormPopUP;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  remarksForm: FormGroup;
  qrResultString: string;
  closeResult: string;
  response;
  enableScanner = false;
  enableForm = false;
  photo;
  signature;
  candidatesDuplicateArray = [];
  enableSecApplicationInput = false;
  enableRemarks = false;
  attendanceFormSubmitted = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private jsService: JsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 4 && resp.id !== 3) {
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
      petDate: new FormControl(''),
      petTime: new FormControl(''),
      venue: new FormControl(''),
      secPost: new FormControl(''),
      secApplication: new FormControl(''),
      isProvisioned: new FormControl(''),
      remarks: new FormControl(''),
      isGorkha: new FormControl(''),
    });

    this.remarksForm = new FormGroup({
      remarks: new FormControl('', Validators.required),
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
    this.qrResultString = this.searchForm.controls['applicationNumber'].value;
    this.getApplicationSubmitted(this.qrResultString);
    this.manageAdmitCardsForm.reset();
    // this.applicationService.getImageV2('P', this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('S', this.searchForm.controls['applicationNumber'].value);
  }

  getApplicationSubmitted(application) {
    this.enableScanner = false;
    this.enableSecApplicationInput = false;
    this.enableRemarks = false;
    this.applicationService.getApplicationSubmitted(application, 1).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.response = resp['body']['responseObject'];

          const response = resp['body']['responseObject'];
          let postDesc;
          if (response.postAppliedFor == 'G') {
            postDesc = 'General Duty'
          } else {
            postDesc = 'Driver'
          }
          this.candidatesDuplicateArray = [];
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
          this.manageAdmitCardsForm.controls['petTime'].setValue(response.petDetails ? response.petDetails.petTime : null);
          this.manageAdmitCardsForm.controls['petDate'].setValue(response.petDetails ? response.petDetails.petDate : null);
          this.manageAdmitCardsForm.controls['venue'].setValue(response.petDetails ? response.petDetails.venue : null);

          this.applicationService.getImageV2('P', response.applicationId).then((photo: any) => {
            const objectURL = URL.createObjectURL(photo);
            this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          this.applicationService.getImageV2('S', response.applicationId).then((sig: any) => {
            const objectURL = URL.createObjectURL(sig);
            this.signature = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          this.applicationService.candidatesDuplicate(application).then((res: any) => {
            if (res.status == 200) {
              if (res['body']['responseCode'] == 200) {
                this.candidatesDuplicateArray = res['body']['responseObject']
                console.log('Resp candidatesDuplicate', res['body']['responseObject']);

              }
            }
          });
        } else {
          // this.sharedService.showWarning()
          this.initializeForm();
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }
      }
    });
  }

  openmd(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'Submit application') {
        this.updatePet();
      }
      if (result == 'Link application') {
        this.applyLinkApplication();
      }
      if (result == 'Save click') {
        this.cancelRegistration();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updatePet() {
    const reqObj = {
      action: 1,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      isProvisioned: this.manageAdmitCardsForm.controls['isProvisioned'].value == true ? 'Y' : 'N',
      remarks: this.manageAdmitCardsForm.controls['remarks'].value || null
    };
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.attendanceFormSubmitted = false;
          this.enableSecApplicationInput = false;
          // this.candidatesDuplicateArray = [];
          this.initializeForm();
          this.photo = null;
          this.signature = null;
          this.enableForm = false;
          this.candidatesDuplicateArray = [];
          this.manageAdmitCardsForm.reset();
          this.attendanceFormSubmitted = false;
          this.sharedService.showSuccess(resp['body']['responseDesc'])
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    });
  }

  confirmation() {
    if (this.enableRemarks) {
      this.attendanceFormSubmitted = true;
    }
    if (this.manageAdmitCardsForm.valid) {
      this.openmd(this.consentPopUp);
    }
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



  downloadAdmitCard() {
    this.jsService.admitCardPdf(this.response.applicationId).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Admit card.pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })
  }

  chestNumberPdf() {
    this.jsService.chestNumberPdf(this.response.applicationId).then((resp: any) => {
      if (resp) {
        // this.blob = new Blob([resp], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Chest.pdf";
        link.click();
        // this.enablePrintReceipt = false;
      }
    })
  }

  getSecPost(event) {
    if (this.manageAdmitCardsForm.controls['secPost'].value == true) {
      this.enableSecApplicationInput = true;
    } else {
      this.enableSecApplicationInput = false;
    }
    console.log('manageAdmitCardsForm', this.manageAdmitCardsForm.controls['secPost'].value)
  }

  linkApplication() {
    if (this.manageAdmitCardsForm.controls['secApplication'].value) {
      this.openmd(this.secondPopUp);
    } else {
      this.sharedService.showWarning('Please enter application no.')
    }

  }

  applyLinkApplication() {
    const reqObj = {
      pApplicationNo: this.response.applicationNo,
      cApplicationNo: this.manageAdmitCardsForm.controls['secApplication'].value
    };
    this.applicationService.linkApplications(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.manageAdmitCardsForm.controls['secApplication'].setValue('');
          this.manageAdmitCardsForm.controls['secPost'].setValue('');
          this.sharedService.showSuccess(resp['body']['responseDesc']);
          this.enableSecApplicationInput = false;
          // this.candidatesDuplicateArray = [];
          this.initializeForm();
          this.photo = null;
          this.signature = null;
          this.enableForm = false;
          this.candidatesDuplicateArray = [];
        } else {
          this.manageAdmitCardsForm.controls['secApplication'].setValue('');
          this.manageAdmitCardsForm.controls['secPost'].setValue('');
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    })
  }

  getProvisioned() {

    if (this.manageAdmitCardsForm.controls['isProvisioned'].value) {
      this.enableRemarks = true;
      this.manageAdmitCardsForm.controls['remarks'].setValidators(Validators.required);
    } else {
      this.enableRemarks = false;
      this.manageAdmitCardsForm.controls['remarks'].clearValidators();
      this.manageAdmitCardsForm.controls['isProvisioned'].setValue('');
      this.manageAdmitCardsForm.controls['remarks'].setValue('');
    }
    this.manageAdmitCardsForm.controls['remarks'].updateValueAndValidity();
    console.log('SID', this.manageAdmitCardsForm.controls['isProvisioned'].value)
  }

  rejectCandidate() {
    this.openmd(this.confFormPopUP)
    // const reqObj = {
    //   action: 8,
    //   applicationId: Number(this.response ? this.response.applicationId : null),
    //   mode: 'PET',
    //   isProvisioned: this.manageAdmitCardsForm.controls['isProvisioned'].value == true ? 'Y' : 'N'
    // };
    // this.applicationService.updatePet(reqObj).then((resp: any) => {
    //   if (resp.status == 200) {
    //     if (resp['body']['responseCode'] == 200) {
    //       this.sharedService.showSuccess(resp['body']['responseDesc'])
    //     } else {
    //       this.sharedService.showWarning(resp['body']['responseDesc'])
    //     }
    //   }
    // });
  }

  cancelRegistration() {
    const reqObj = {
      action: 8,
      applicationId: Number(this.response ? this.response.applicationId : null),
      mode: 'PET',
      remarks: this.remarksForm.controls['remarks'].value
    };
    this.applicationService.updatePet(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.initializeForm();
          this.photo = null;
          this.signature = null;
          this.enableForm = false;
          this.candidatesDuplicateArray = [];
          this.remarksForm.reset();
          this.sharedService.showSuccess(resp['body']['responseDesc'])
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc'])
        }
      }
    });
  }

}
