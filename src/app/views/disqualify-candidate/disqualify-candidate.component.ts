import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master/master.service';
import { element } from 'protractor';

@Component({
  selector: 'app-disqualify-candidate',
  templateUrl: './disqualify-candidate.component.html',
  styleUrls: ['./disqualify-candidate.component.css']
})
export class DisqualifyCandidateComponent implements OnInit {

  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  heightForm: FormGroup;
  chestForm: FormGroup;
  raceForm: FormGroup;
  heighJumpForm: FormGroup;
  broadJumpForm: FormGroup;
  drivingForm: FormGroup;
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
  anableOtherAction = false;
  subCategoryList = [];
  minDate = '1993-10-31';
  maxDate = '2003-10-31';
  noPost = null;
  categoryList = [];
  changeArray = [];
  categoryArray = [
    {
      name: 'General'
    }, {
      name: 'SC'
    }, {
      name: 'ST'
    }, {
      name: 'OBC'
    }, {
      name: 'Gorkhas'
    }
  ]

  subCategoryArray = [
    {
      name: 'Home guards'
    }, {
      name: 'Distinguished sportsmen'
    }, {
      name: 'General'
    }
  ];
  submitApplicationForm = false;
  constructor(
    private applicationService: ApplicationService,
    private sanitizer: DomSanitizer,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.checkRole();
  }




  initializeForm() {
    this.searchForm = new FormGroup({
      applicationNumber: new FormControl(''),
    });

    this.manageAdmitCardsForm = new FormGroup({
      applicationNo: new FormControl(''),
      district: new FormControl(''),
      name: new FormControl('', Validators.required),
      fatherName: new FormControl('', Validators.required),
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
      remarks: new FormControl('', Validators.required),
      hpBonafideCertifcateNo: new FormControl('', Validators.required),
    });
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 22 && resp.id !== 3) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
        }
      }
    });
  }

  scanQr() {
    this.enableScanner = true;
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
    this.enableScanner = false;
    this.submitApplicationForm = false;
    this.enableForm = false;
    this.initializeForm();
    this.anableOtherAction = false;
    this.applicationService.getApplicationSubmittedV2(application).then((resp: any) => {
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
          this.manageAdmitCardsForm.controls['hpBonafideCertifcateNo'].setValue(response.hpBonafideCertifcateNo);
          this.manageAdmitCardsForm.controls['fatherName'].setValue(response.fatherName);
          if (response.dob) {
            const date = response.dob.split('-');
            this.manageAdmitCardsForm.controls['dob'].setValue(date[2] + '-' + date[1] + '-' + date[0]);
          }

          this.manageAdmitCardsForm.controls['gender'].setValue(response.genderId + '');
          this.manageAdmitCardsForm.controls['category'].setValue(response.categoryId);
          console.log('postDesc ', postDesc)
          this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(response.postAppliedFor);
          this.manageAdmitCardsForm.controls['mobileNo'].setValue(response.mobileNo);
          this.manageAdmitCardsForm.controls['isGorkha'].setValue(response.isGorkha);
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
          this.getcategory(this.response.districtId);
          this.getSelectedCategory(response.categoryId);
          this.manageAdmitCardsForm.disable();
        } else {
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }

      }
    });
  }

  getcategory(event) {
    this.masterService.category(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.categoryList = resp['body']['responseObject'];
        }
      }
    });
  }

  geDob(event) {
    console.log('event ', this.manageAdmitCardsForm.controls['dob'].value)
    const datePipe = new DatePipe('en-US');
    const transformedDate = datePipe.transform(this.manageAdmitCardsForm.controls['dob'].value, 'yyyy-MM-dd');
    // this.applicationForm.controls['dob'].setValue(transformedDate);
    // console.log('transformedDate', transformedDate);
    // this.manageAdmitCardsForm.controls['subCategory'].setValue('');
    // this.noPost = null;
  }


  allowEdit() {
    this.anableOtherAction = true;
    // this.manageAdmitCardsForm.enable()
    this.manageAdmitCardsForm.controls['name'].enable();
    this.manageAdmitCardsForm.controls['fatherName'].enable();
    this.manageAdmitCardsForm.controls['dob'].enable();
    // this.manageAdmitCardsForm.controls['gender'].enable();
    // this.manageAdmitCardsForm.controls['category'].enable();
    // this.manageAdmitCardsForm.controls['subCategory'].enable();
    this.manageAdmitCardsForm.controls['remarks'].enable();
    this.manageAdmitCardsForm.controls['hpBonafideCertifcateNo'].enable();
    // this.manageAdmitCardsForm.controls['isGorkha'].enable();
    // this.manageAdmitCardsForm.controls['postAppliedFor'].enable();
  }

  cancelEdit() {
    this.submitApplicationForm = false;
          this.enableForm = false;
          this.initializeForm();
          this.anableOtherAction = false;
  }


  getSelectedCategory(event) {
    // console.log("this.applicationForm.controls['gender'].value", this.applicationForm.controls['gender'].value)
    // this.manageAdmitCardsForm.controls['subCategory'].setValue('');
    // console.log('selectedDistrict ', this.selectedDistrict)
    this.masterService.subCategory(this.response.districtId, this.response.genderId).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          const response = resp['body']['responseObject'];
          if (this.manageAdmitCardsForm.controls['subCategory'].value) {
            console.log('1')
            this.manageAdmitCardsForm.controls['subCategory'].setValue('')
          } else {
            response.forEach(element => {
              if (this.response.subCategoryId == element.id) {
                console.log('2')
                this.manageAdmitCardsForm.controls['subCategory'].setValue(element.id);
                // this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(this.response.);
              }
            });
          }
          this.noPost = null;
          this.subCategoryList = resp['body']['responseObject'];
        }
      }
    })
    this.validateUserAge();
  }

  validateUserAge() {
    const dob = this.manageAdmitCardsForm.controls['dob'].value;
    // const isGorkha = this.applicationForm.controls['gorkha'].value;

  }


  getSelectedSubCategory(event) {

    console.log('!this.enableDriverPost ', this.manageAdmitCardsForm.controls['postAppliedFor'].value)
    let postType;
    postType = this.response.postAppliedFor;

    if (postType) {
      const dob = this.manageAdmitCardsForm.controls['dob'].value;
      let month;
      let day;
      let year;
      if (dob.month < 10) {
        month = '0' + dob.month;
      } else {
        month = dob.month;
      }
      if (dob.day < 10) {
        day = '0' + dob.day;
      } else {
        day = dob.day;
      }
      if (dob.year) {
        year = dob.year;
      }
      const selectedDate = year + '-' + month + '-' + day;
      const reqObj = {
        isGorkha: 'N',
        dob: this.manageAdmitCardsForm.controls['dob'].value,
        districtId: this.response.districtId,
        postType: postType,
        category: this.manageAdmitCardsForm.controls['category'].value,
        subCategory: this.manageAdmitCardsForm.controls['subCategory'].value,
        gender: this.manageAdmitCardsForm.controls['gender'].value
      }
      this.applicationService.post(reqObj).then((resp: any) => {
        if (resp.status == 200) {
          if (resp['body']['responseCode'] == 200) {
            if (resp['body']['responseObject'].post == 0) {
              this.sharedService.showWarning(resp['body']['responseObject'].message)
              this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(0);
              this.noPost = 'Not Available';
            } else {
              this.noPost = 'Available';
              this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(resp['body']['responseObject'].post);
            }
          } else {
            this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(0);
            this.noPost = 'Not Available';
            this.sharedService.showWarning(resp['body']['responseDesc']);

          }
        }
      })
    } else {
      this.sharedService.showWarning('Please complete the form');
    }

  }

  consents() {
    this.changeArray = [];

    console.log('Form Value ' + JSON.stringify(this.manageAdmitCardsForm.value.postAppliedFor))
    console.log('this.response ' + JSON.stringify(this.response))
    console.log('this.manageAdmitCardsForm ' + JSON.stringify(this.manageAdmitCardsForm.controls['']))


    const postApplied = this.response.postAppliedFor == 'D' ? 'Driver' : 'General Duty';
    const splittedDob = (this.manageAdmitCardsForm.controls['dob'].value).split('-');
    const dateOfBirth = splittedDob[2] + '-' + splittedDob[1] + '-' + splittedDob[0]
    if (this.response.postAppliedFor != this.manageAdmitCardsForm.controls['postAppliedFor'].value) {
      const postAppliedFor = {
        sec: 'Post Applied For',
        oldValue: this.response.postAppliedFor == 'D' ? 'Driver' : 'General Duty',
        newValue: this.manageAdmitCardsForm.controls['postAppliedFor'].value == 'D' ? 'Driver' : 'General Duty'
      };
      this.changeArray.push(postAppliedFor);
    } 
    if (this.response.name != this.manageAdmitCardsForm.controls['name'].value) {
      const name = {
        sec: 'Name',
        oldValue: this.response.name,
        newValue: this.manageAdmitCardsForm.controls['name'].value
      };
      this.changeArray.push(name);
    }
    if (this.response.hpBonafideCertifcateNo !=  this.manageAdmitCardsForm.controls['hpBonafideCertifcateNo'].value) {
      const hpBonafideCertifcateNo = {
        sec: 'HP Bonafide Certifcate No',
        oldValue: this.response.hpBonafideCertifcateNo,
        newValue: this.manageAdmitCardsForm.controls['hpBonafideCertifcateNo'].value
      };
      this.changeArray.push(hpBonafideCertifcateNo);
    }
    if (this.response.fatherName != this.manageAdmitCardsForm.controls['fatherName'].value) {
      const fatherName = {
        sec: 'Father Name',
        oldValue: this.response.fatherName,
        newValue: this.manageAdmitCardsForm.controls['fatherName'].value
      };
      this.changeArray.push(fatherName);
    }
    if (this.response.dob != dateOfBirth) {
      const dob = {
        sec: 'DOB',
        oldValue: this.response.dob,
        newValue: dateOfBirth
      };
      this.changeArray.push(dob);
    }
    if (this.response.genderId != this.manageAdmitCardsForm.controls['gender'].value) {
      const gender = {
        sec: 'Gender',
        oldValue: this.response.genderId == 1 ? 'Female' : 'Male',
        newValue: this.manageAdmitCardsForm.controls['gender'].value == 1 ? 'Female' : 'Male'
      };
      this.changeArray.push(gender);
    }
    if (this.response.categoryId != this.manageAdmitCardsForm.controls['category'].value) {
      let categoryDesc;
      this.categoryList.forEach(x => {
        if (this.manageAdmitCardsForm.controls['category'].value == x.id) {
          categoryDesc = x.name
        }
      })
      const category = {
        sec: 'Category',
        oldValue: this.response.category,
        newValue: categoryDesc
      };
      this.changeArray.push(category);
    }
    if (this.response.subCategoryId != this.manageAdmitCardsForm.controls['subCategory'].value) {
      let subCategoryDesc;
      this.subCategoryList.forEach(x => {
        if (this.manageAdmitCardsForm.controls['subCategory'].value == x.id) {
          subCategoryDesc = x.name
        }
      })

      const subCategoryId = {
        sec: 'Sub-Category',
        oldValue: this.response.subCategory,
        newValue: subCategoryDesc
      };
      this.changeArray.push(subCategoryId);
    }
    
    if (this.response.isGorkha != this.manageAdmitCardsForm.controls['isGorkha'].value) {
      const isGorkha = {
        sec: 'isGorkha',
        oldValue: this.response.isGorkha == 'Y' ? 'Yes' : 'No',
        newValue: this.manageAdmitCardsForm.controls['isGorkha'].value == 'Y' ? 'Yes' : 'No'
      };
      this.changeArray.push(isGorkha);
      // this.changeArray = newArray
    }

    console.log('newArray : ' + JSON.stringify(this.changeArray));
    this.openmd(this.consentPopUp);
  }

  openmd(content) {
    console.log('openmd')
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'lg', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'first consent') {
        this.updateApplication();
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

  updateApplication() { 
      const reqObj = {
        applicationNumber: this.response.applicationNo
      };
      this.applicationService.disqualifyApplicantWrittenExam(reqObj).then((resp: any) => {
        if (resp.status == 200) {
          this.submitApplicationForm = false;
          this.enableForm = false;
          this.initializeForm();
          this.anableOtherAction = false;
          if (resp['body']['responseCode'] == 200) {
            this.sharedService.showSuccess(resp['body']['responseDesc']);
          } else {
            this.sharedService.showWarning(resp['body']['responseDesc']);
          }
        }
      }); 
  }


}

