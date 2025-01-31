import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { JsService } from '../../services/js/js.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PATTER_VALIDATION } from '../../app.constants';
import { SharedService } from '../../services/shared/shared.service';
import { stat } from 'fs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ChangeDetectorRef } from '@angular/core';
import { MasterService } from '../../services/master/master.service';
import { ApplicationService } from '../../services/application/application.service';
import { HostListener } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form') form: ElementRef;
  @ViewChild('keywordsInput') keywordsInput;
  @ViewChild('applicationPreview') applicationPreview;
  @ViewChild('consentPopUp') consentPopUp;
  // @ViewChild('login-modal') login-modal: ElementRef;

  dateOfBirth;
  model: NgbDateStruct;
  changePasswordForm: FormGroup;
  applicationForm: FormGroup;
  popUpForm: FormGroup;
  applicationPreviewForm: FormGroup;
  header = {
    title: 'Dashboard',
    button: false
  };
  userDetails;
  // today = Date.now();
  // fixedTimezone = this.today;
  formDataPhoto: FormData;
  formDataSignature: FormData;
  blob;
  fileObjPhoto: any;
  fileObjSignature: any;
  fileObjAadhaar: any;
  // formDataAadhaar: FormData;
  enablePayment = false;
  disableSubmit = true;
  enablePrint = false;
  enableDriverDetails = false;
  enableFirDetails = false;
  enableDriverPost = true;
  save = false;
  payment = false;
  enableCertificateDetails = false;
  displayApplication = false;
  enableConfirmationButton = true;
  noPost = null;
  submitApplicationForm = false;
  yearArray = [];
  myTooltip = 'Tooltip text';

  courseArray = [
    {
      name: 'Graduation'
    }, {
      name: 'Post Graduation'
    }, {
      name: 'Others'
    }
  ]
  boardArray = [
    {
      name: 'CBSE'
    }, {
      name: 'ICSE'
    }, {
      name: 'Himachal Pradesh board of school Education'
    }, {
      name: 'Others'
    }
  ]
  // districtArray = [
  //   {
  //     name: 'Bilaspur'
  //   }, {
  //     name: 'Chamba'
  //   }, {
  //     name: 'Hamirpur'
  //   }, {
  //     name: 'Kangra'
  //   }, {
  //     name: 'Kinnaur'
  //   }, {
  //     name: 'Kullu'
  //   }, {
  //     name: 'L&S'
  //   }, {
  //     name: 'Mandi'
  //   }, {
  //     name: 'Shimla'
  //   }, {
  //     name: 'Sirmour'
  //   }, {
  //     name: 'Solan'
  //   }, {
  //     name: 'Una'
  //   }
  // ]

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
  encRequest: String;
  accessCode: String;
  closeResult: string;
  selectedDistrict;
  statesList = [];
  genderList = [];
  idProofList = [];
  qualificationList = [];
  tenthBoardList = [];
  twelthBoardList = [];
  districtList = [];
  tehsilList = [];
  blockList = [];
  panchayatList = [];
  permanentTehsilList = [];
  permanentBlockList = [];
  categoryList = [];
  subCategoryList = [];
  firDistrictList = [];
  corDistrictList = [];
  permanentPanchayatList = [];
  saveApplicationPayload: any;
  additionalQualificationDetails = [];
  todayDate = new Date();
  today = this.todayDate.toISOString().split('T')[0];


  selectedToday;

  minDate = "1993-10-31"
  maxDate = "2003-10-31"
  enableForm = false;
  setSportsCategoryArray = [];
  sportsCategoryArray = [
    {
      id: '12',
      name: 'Category No. 1'
    }, {
      id: '13',
      name: 'Category No. 2'
    }, {
      id: '14',
      name: 'Category No. 3'
    }, {
      id: '15',
      name: 'Category No. 4'
    },
  ]

  sportsSubCategory1Array = [
    {
      id: '1',
      name: 'Medal winners of Olympic Games/Winter Olympics '
    }, {
      id: '2',
      name: 'Commonwealth Games'
    }, {
      id: '3',
      name: 'Medal winners of Asian Games/Winter Asiad'
    }
  ]

  sportsSubCategory2Array = [
    {
      id: '4',
      name: 'Participation in Olympic Games'
    }, {
      id: '5',
      name: 'Participation in Commonwealth Games'
    }, {
      id: '6',
      name: 'Participation in Asian Games'
    }
  ]

  sportsSubCategory3Array = [
    {
      id: '7',
      name: 'Medal winners in National Games'
    }, {
      id: '8',
      name: 'Medal winners in recognized Senior National Championships'
    }, {
      id: '20',
      name: 'Medal winners in South Asian Federation (SAF) Games'
    }
  ]

  sportsSubCategory4Array = [
    {
      id: '9',
      name: 'Medal winners in All India Inter-Versity Sports Tournaments '
    }, {
      id: '10',
      name: 'Medal winners in All India National School Games'
    }, {
      id: '11',
      name: 'Medal winners in recognized Jr. National Sports Championships'
    }, {
      id: '21',
      name: 'Participation in South Asian Federation (SAF) Games'
    }, {
      id: '22',
      name: 'At least three times participation in National Championship and Senior National Championship'
    }
  ]


  constructor(
    private router: Router,
    private jsService: JsService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private cdref: ChangeDetectorRef,
    private masterService: MasterService,
    private applicationService: ApplicationService
  ) {
    this.accessCode = 'YOURACCESSCODEGOESHERE';
    this.getApplicationStatus();
    this.getToday();
  }

  // ngOnChanges() {

  //   this.getApplicationStatus();
  // }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
    console.log('today', this.today)
    let dob = this.today.split('-');

    this.selectedToday = {
      year: Number(dob[0]),
      month: Number(dob[1]),
      day: Number(dob[2])
    };

    // console.log('today ', this.today);
    console.log('selectedToday', this.selectedToday)
    /*eslint-disable*/
    this.popUpForm = new FormGroup({
      confirmationCheck: new FormControl('', Validators.required)
    });

    this.applicationForm = new FormGroup({
      msisdn: new FormControl('', [Validators.required, Validators.pattern(PATTER_VALIDATION.DIGI10TPHONE)]),
      sportsCategoryMainId: new FormControl('', Validators.required),
      sportsCategory: new FormControl('', Validators.required),
      isGorkha: new FormControl('', Validators.required),
      hpBonafideNo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),

      categoryId: new FormControl('', Validators.required),

      aadhaar: new FormControl('', Validators.pattern(PATTER_VALIDATION.DIGI12NO)),
      corAddressType: new FormControl(''),
      corAddressDistrict: new FormControl('', Validators.required),
      corAddressFullAddress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      corAddressState: new FormControl('', Validators.required),

      dob: new FormControl('', Validators.required),

      drivingLicenseDetailsDateIssue: new FormControl(''),
      drivingLicenseDetailsDlNumber: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      drivingLicenseDetailsIssuingAuthority: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      drivingLicenseDetailsValidateDate: new FormControl(''),
      drivingLicenseDetailsVehicleType: new FormControl(''),

      fatherName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      gender: new FormControl('', Validators.required),
      // hpBonafideCertifcateNo: new FormControl(''),
      identificationMark: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),

      otherQualificationscourseId: new FormControl(''),
      otherQualificationsNameOfInstitute: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      otherQualificationsYearOfPassing: new FormControl(''),

      perAddressAddressType: new FormControl(''),
      perAddressBlock: new FormControl('', Validators.required),
      perAddressDistrict: new FormControl('', Validators.required),
      perAddressFullAddress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      perAddressPanchayat: new FormControl('', Validators.required),
      perAddressTehsil: new FormControl(''),

      postAppliedFor: new FormControl('', Validators.required),
      subCategoryId: new FormControl('', Validators.required),

      theQualificationBoardId: new FormControl('', Validators.required),
      theQualificationCertificateNumber: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      theQualificationDateOfIssue: new FormControl('', Validators.required),

      tweQualificationBoardId: new FormControl('', Validators.required),
      tweQualificationCertificateNumber: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      tweQualificationDateOfIssue: new FormControl(''),
      tweQualificationStatus: new FormControl('', Validators.required),

      undertakinginfoCorrect: new FormControl(''),
      undertakingisAccused: new FormControl('', Validators.required),
      undertakingisProceeding: new FormControl('', Validators.required),
      undertakingreadInstruction: new FormControl(''),

      undertakingfirDetailsDistrict: new FormControl(''),
      undertakingfirDetailsFirNumber: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
      undertakingfirDetailsOtherInfo: new FormControl(''),
      undertakingfirDetailsPlace: new FormControl(''),
      undertakingfirDetailsPloiceStation: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      undertakingfirDetailsState: new FormControl(''),
      undertakingfirDetailsYear: new FormControl(''),

      noPosts: new FormControl(''),

      photo: new FormControl(''),
      signature: new FormControl(''),
      anyInfo: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)])
    });






    this.applicationPreviewForm = new FormGroup({
      msisdn: new FormControl(''),
      sportsCategoryMainId: new FormControl('', Validators.required),
      sportsCategory: new FormControl('', Validators.required),
      isGorkha: new FormControl('', Validators.required),
      categoryId: new FormControl(''),
      hpBonafideNo: new FormControl(''),
      aadhaar: new FormControl(''),
      corAddressType: new FormControl(''),
      corAddressDistrict: new FormControl(''),
      corAddressFullAddress: new FormControl(''),
      corAddressState: new FormControl(''),

      dob: new FormControl(''),

      drivingLicenseDetailsDateIssue: new FormControl(''),
      drivingLicenseDetailsDlNumber: new FormControl(''),
      drivingLicenseDetailsIssuingAuthority: new FormControl(''),
      drivingLicenseDetailsValidateDate: new FormControl(''),
      drivingLicenseDetailsVehicleType: new FormControl(''),

      fatherName: new FormControl(''),
      fullName: new FormControl(''),
      gender: new FormControl(''),
      hpBonafideCertifcateNo: new FormControl(''),
      identificationMark: new FormControl(''),

      otherQualificationscourseId: new FormControl(''),
      otherQualificationsNameOfInstitute: new FormControl(''),
      otherQualificationsYearOfPassing: new FormControl(''),

      perAddressAddressType: new FormControl(''),
      perAddressBlock: new FormControl(''),
      perAddressDistrict: new FormControl(''),
      perAddressFullAddress: new FormControl(''),
      perAddressPanchayat: new FormControl(''),
      perAddressTehsil: new FormControl(''),

      postAppliedFor: new FormControl(''),
      subCategoryId: new FormControl(''),

      theQualificationBoardId: new FormControl(''),
      theQualificationCertificateNumber: new FormControl(''),
      theQualificationDateOfIssue: new FormControl(''),

      tweQualificationBoardId: new FormControl(''),
      tweQualificationCertificateNumber: new FormControl(''),
      tweQualificationDateOfIssue: new FormControl(''),
      tweQualificationStatus: new FormControl(''),

      undertakinginfoCorrect: new FormControl(''),
      undertakingisAccused: new FormControl(''),
      undertakingisProceeding: new FormControl(''),
      undertakingreadInstruction: new FormControl(''),

      undertakingfirDetailsDistrict: new FormControl(''),
      undertakingfirDetailsFirNumber: new FormControl(''),
      undertakingfirDetailsOtherInfo: new FormControl(''),
      undertakingfirDetailsPlace: new FormControl(''),
      undertakingfirDetailsPloiceStation: new FormControl(''),
      undertakingfirDetailsState: new FormControl(''),
      undertakingfirDetailsYear: new FormControl(''),

      noPosts: new FormControl(''),

      photo: new FormControl(''),
      signature: new FormControl(''),
      anyInfo: new FormControl('')
    });

    // this.sharedService.getLocalStorageItem('')
    for (let i = 0; i < 42; i++) {
      const newObj = {
        year: 1980 + i
      };
      this.yearArray.push(newObj)
    }
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      conPassword: new FormControl('', [Validators.required])
    });

    this.applicationForm.controls['isGorkha'].setValue('N')
    this.getApplicationStatus();
    this.states();
    // this.callAllServices();
    this.genders(),
      this.idProofs();
    this.qualifications();
    this.twelthBoard();
    this.tenthBoard();
    this.district();
  }

  callAllServices() {
    Promise.all([
      // this.genders(),
      // this.idProofs(),
      // this.qualifications(),
      // this.twelthBoard(),
      // this.tenthBoard(),
      // this.district()
    ]).then((values) => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          myId: 'heroId',
          foo: ''
        }
      };
    }, (error) => {
    });
  }


  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    console.log('Scroll Event');
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
      this.popUpForm.enable();
    }
  }

  // twelthBoard() {
  //   this.masterService.boards(2).then((resp: any) => {
  //     if (resp.status === 200) {
  //       if (resp['body']['responseCode'] === 200) {
  //         this.twelthBoardList = resp['body']['responseObject'];
  //         // this.sharedService.setLocalStorageItem('twelthBoardList', JSON.stringify(resp['body']['responseObject']));
  //       }
  //     }
  //   });
  // }

  tenthBoard() {
    this.masterService.boards(1).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.tenthBoardList = resp['body']['responseObject'];
          // this.sharedService.setLocalStorageItem('tenthBoardList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  twelthBoard() {
    this.masterService.boards(2).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.twelthBoardList = resp['body']['responseObject'];
          // this.sharedService.setLocalStorageItem('twelthBoardList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  // tenthBoard() {
  //   this.masterService.boards(1).then((resp: any) => {
  //     if (resp.status === 200) {
  //       if (resp['body']['responseCode'] === 200) {
  //         this.sharedService.setLocalStorageItem('tenthBoardList', JSON.stringify(resp['body']['responseObject']));
  //       }
  //     }
  //   });
  // }


  getApplicationStatus() {
    this.applicationService.getApplicationStatus().then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {

          this.displayApplication = true;
          console.log('RESP: ', resp['body']['responseObject']);
          const response = resp['body']['responseObject'];
          // this.applicationForm.controls['fullName'].setValue(response.name);
          // this.applicationForm.controls['hpBonafideNo'].setValue(response.hpBonafideCertifcateNo);
          if (response.status == 2) {
            this.open(this.keywordsInput)
            this.dispayDraftApplication();
          } else if (response.status == 3) {
            this.router.navigateByUrl('/Payment');
          } else if (response.status == 4) {
            console.log('Payment Done')
          }
        }
      }
    });
  }

  ngAfterViewInit() {
    // this.popUpForm.disable();
    // setTimeout(() => this.open(this.keywordsInput));
  }





  states() {
    this.masterService.states().then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.statesList = resp['body']['responseObject'];
          // this.sharedService.setLocalStorageItem('statesList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  // states() {
  //   this.sharedService.getLocalStorageItem('statesList').then((resp: any) => {
  //     if (resp) {
  //       this.statesList = resp;
  //       console.log('resp State', resp);
  //       // this.district();
  //     }
  //   });
  // }

  district() {
    // console.log('district ', id)
    this.masterService.districts(9).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.districtList = resp['body']['responseObject'];
        }
      }
    });
  }

  // genders() {
  //   this.sharedService.getLocalStorageItem('genderList').then((resp: any) => {
  //     if (resp) {
  //       this.genderList = resp;
  //     }
  //   });
  // }

  genders() {
    this.masterService.genders().then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.genderList = resp['body']['responseObject']
          // this.sharedService.setLocalStorageItem('genderList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }


  idProofs() {
    this.sharedService.getLocalStorageItem('idProofList').then((resp: any) => {
      if (resp) {
        this.idProofList = resp;
      }
    });
  }

  // qualificatios() {
  //   this.sharedService.getLocalStorageItem('qualificationList').then((resp: any) => {
  //     if (resp) {
  //       console.log('JSON.parse(resp) ', resp)
  //       this.qualificationList = resp;
  //     }
  //   });
  // }

  qualifications() {
    this.masterService.qualifications('OTH').then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.qualificationList = resp['body']['responseObject'];
          // this.sharedService.setLocalStorageItem('qualificationList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  // tenthBoard() {
  //   this.sharedService.getLocalStorageItem('tenthBoardList').then((resp: any) => {
  //     if (resp) {
  //       console.log('tenthBoard ', resp)
  //       this.tenthBoardList = resp;
  //     }
  //   });
  // }

  // twelthBoard() {
  //   this.sharedService.getLocalStorageItem('twelthBoardList').then((resp: any) => {
  //     if (resp) {
  //       console.log('twelthBoard ', resp)
  //       this.twelthBoardList = resp;
  //     }
  //   });
  // }

  getSelectedFirState(event) {
    this.masterService.districts(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.firDistrictList = resp['body']['responseObject'];
        }
      }
    });
  }

  getSelectCorState(event) {
    this.masterService.districts(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.corDistrictList = resp['body']['responseObject'];
          this.applicationForm.controls['corAddressDistrict'].setValue('');
        }
      }
    });
  }

  getSelectDistrict(event) {

    this.masterService.tehsils(event).then((resp: any) => {
      if (resp.status === 200) {
        console.log('resp.status ', resp['body']['responseObject'])
        if (resp['body']['responseCode'] === 200) {
          this.tehsilList = resp['body']['responseObject'];
        }
      }
    });

    this.masterService.blocks(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.blockList = resp['body']['responseObject'];
        }
      }
    });


  }

  getPermanentDistrict(event) {
    this.applicationForm.controls['categoryId'].setValue('');
    this.applicationForm.controls['subCategoryId'].setValue('');
    this.applicationForm.controls['noPosts'].setValue('');

    this.applicationForm.controls['perAddressTehsil'].setValue('');
    this.applicationForm.controls['perAddressBlock'].setValue('');
    this.applicationForm.controls['perAddressPanchayat'].setValue('');
    this.noPost = null;

    this.selectedDistrict = event;
    // this.permanentTehsilList = this.getTehsils(event);
    // this.permanentBlockList = this.getblocks(event);
    // console.log('this.permanentTehsilList ', this.permanentTehsilList)
    // console.log('this.permanentBlockList ', this.permanentBlockList)
    this.masterService.tehsils(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.permanentTehsilList = resp['body']['responseObject'];
        }
      }
    })

    this.masterService.blocks(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.permanentBlockList = resp['body']['responseObject'];
        }
      }
    })

    this.masterService.category(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.categoryList = resp['body']['responseObject'];
        }
      }
    });
  }

  getTehsils(event) {
    this.masterService.tehsils(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          return resp['body']['responseObject'];
        }
      }
    })
  }

  getblocks(event) {
    this.masterService.blocks(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          return resp['body']['responseObject'];
        }
      }
    })
  }


  getSelectedBlock(event) {
    this.masterService.panchayats(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.panchayatList = resp['body']['responseObject'];
        }
      }
    })
  }

  getSelectedPermBlock(event) {
    this.masterService.panchayats(event).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.permanentPanchayatList = resp['body']['responseObject'];
        }
      }
    })
  }

  getSelectedCategory(event) {
    // console.log("this.applicationForm.controls['gender'].value", this.applicationForm.controls['gender'].value)
    this.applicationForm.controls['subCategoryId'].setValue('');
    console.log('selectedDistrict ', this.selectedDistrict)
    if (this.selectedDistrict && this.applicationForm.controls['gender'].value) {
      this.masterService.subCategory(this.selectedDistrict, this.applicationForm.controls['gender'].value).then((resp: any) => {
        if (resp.status === 200) {
          if (resp['body']['responseCode'] === 200) {
            this.applicationForm.controls['noPosts'].setValue('');
            this.noPost = null;
            this.subCategoryList = resp['body']['responseObject'];
          }
        }
      })
    } else {
      this.sharedService.showWarning('Please select gender/district');
    }


    this.validateUserAge();
  }

  validateUserAge() {
    const dob = this.applicationForm.controls['dob'].value;
    // const isGorkha = this.applicationForm.controls['gorkha'].value;

  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'lg', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      console.log('Result: ', result)
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openmd(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'Submit application') {

        this.applicationService.saveDirectApplication(this.saveApplicationPayload).then((resp: any) => {
          if (resp.status == 200) {
            if (resp['body']['responseCode'] == 200) {
              this.formDataPhoto.append('userId', resp['body']['responseObject'].userId);
              this.formDataSignature.append('userId', resp['body']['responseObject'].userId);

              this.uploadFile(this.formDataPhoto);
              this.uploadFile(this.formDataSignature);

              // this.enablePayment = true;
              // this.disableSubmit = false;
              // this.save = true;
              // this.sharedService.showSuccess('Application submitted successfully')
              // this.applicationForm.disable();
              console.log('RESP', resp['body']['responseObject'])
            } else {
              this.sharedService.showError(resp['body']['responseDesc'])
            }
          }
        })
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openXlModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'xl', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      console.log('Result: ', result)
      // if (result == 'Submit application') {

      //   this.applicationService.saveApplication(this.saveApplicationPayload).then((resp: any) => {
      //     if (resp.status == 200) {
      //       if (resp['body']['responseCode'] == 200) {
      //         this.enablePayment = true;
      //         this.disableSubmit = false;
      //         this.save = true;
      //         this.sharedService.showSuccess('Application submitted successfully')
      //         this.applicationForm.disable();
      //         console.log('RESP', resp['body']['responseObject'])
      //       } else {
      //         this.sharedService.showError(resp['body']['responseDesc'])
      //       }
      //     }
      //   })
      // }
      if (result == 'Open Consent') {
        this.openmd(this.consentPopUp)
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


  onFileChangePhoto(fileInput) {
    console.log('event', event);
    this.sharedService.getLocalStorageItem('userId').then((resp: any) => {
      if (resp) {

        if (fileInput.target.files && fileInput.target.files.length > 0) {
          const reader = new FileReader();
          const fileInputEvent = fileInput.target.files[0];
          console.log('fileInputEvent ', fileInputEvent)
          if (fileInputEvent.type == 'image/png' || fileInputEvent.type == 'image/jpeg') {
            let size = 1900;
            console.log('fileInputEvent.size', fileInputEvent.size)
            // fileInputEvent.size
            if (fileInputEvent.size > 10000 && fileInputEvent.size < 200000) {
              console.log('true')
              reader.readAsDataURL(fileInputEvent);
              reader.onload = (event: any) => {
                this.fileObjPhoto = event.target.result;
                const img = new Image();
                const width = img.width;
                const height = img.height;
                console.log('width ', width)
                console.log('height ', height)
              };
              console.log('fileInputEvent ', fileInputEvent);
              this.formDataPhoto = new FormData();
              this.formDataPhoto.append('file', fileInputEvent, fileInputEvent.name);

              this.formDataPhoto.append('docType', 'P');
              this.formDataPhoto.append('rcType', '1');
              // this.uploadFile(this.formDataPhoto);
            } else {
              this.sharedService.showWarning("File size can't be greater than 200 KB and less than 10KB")
            }
          } else {
            this.sharedService.showWarning('Please upload valid format')
          }

        }
      }
    });

  }

  onFileChangeSignature(fileInput) {
    console.log('event', event);
    console.log('event', event);

    this.sharedService.getLocalStorageItem('userId').then((resp: any) => {
      if (resp) {

        if (fileInput.target.files && fileInput.target.files.length > 0) {
          const reader = new FileReader();
          const fileInputEvent = fileInput.target.files[0];
          console.log('fileInputEvent ', fileInputEvent)
          if (fileInputEvent.type == 'image/png' || fileInputEvent.type == 'image/jpeg') {
            if (fileInputEvent.size > 4000 && fileInputEvent.size < 30000) {
              reader.readAsDataURL(fileInputEvent);
              reader.onload = (event: any) => {
                this.fileObjSignature = event.target.result;
              };
              console.log('fileInputEvent ', fileInputEvent);
              this.formDataSignature = new FormData();
              this.formDataSignature.append('file', fileInputEvent, fileInputEvent.name);

              this.formDataSignature.append('docType', 'S');
              this.formDataSignature.append('rcType', '1');
              // this.uploadFile(this.formDataSignature);
            } else {
              this.sharedService.showWarning("File size can't be greater than 4KB and less than 30KB")
            }
          } else {
            this.sharedService.showWarning('Please upload valid format')
          }

        }
      }
    });
  }

  uploadFile(formDataAadhaar) {
    // this.formData.append('action', 1);
    this.applicationService.uploadImage(formDataAadhaar).then((resp: any) => {
      console.log('RESP : ' + JSON.stringify(resp));
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.enablePayment = true;
          this.disableSubmit = false;
          this.save = true;
          this.sharedService.showSuccess('Application submitted successfully')
          this.applicationForm.reset();
          this.submitApplicationForm = false;
          // this.sharedService.showSuccess(resp['body']['responseDesc']);
          // window.location.reload();
        } else {
          this.sharedService.showError(resp['body']['responseDesc']);
        }
      } else {
        this.sharedService.showError(resp['body']['responseDesc']);
      }
    });
  }

  getDob(event) {
    console.log('event', event);
  }

  saveApplication() {




    console.log('Valid Form ', this.applicationForm.valid)
    console.log('Valid Form ', this.applicationForm.value)
    // const dob = ;
    // const tweQualificationDateOfIssue = ;
    // const theQualificationDateOfIssue = ;
    // const drivingLicenseDetailsDateIssue = ;
    // const drivingLicenseDetailsValidateDate = ;

    // let dobMonth;
    // let dobDay;
    // let tweQualificationDateOfIssueMonth;
    // let tweQualificationDateOfIssueDay;
    // let theQualificationDateOfIssueMonth;
    // let theQualificationDateOfIssueDay;
    // let drivingLicenseDetailsDateIssueMonth;
    // let drivingLicenseDetailsDateIssueDay;
    // let drivingLicenseDetailsValidateDateMonth;
    // let drivingLicenseDetailsValidateDateDay;
    // if (dob.month < 10) {
    //   dobMonth = '0' + dob.month;
    // } else {
    //   dobMonth = dob.month;
    // }
    // if (dob.day < 10) {
    //   dobDay = '0' + dob.day;
    // } else {
    //   dobDay = dob.day;
    // }


    // if (tweQualificationDateOfIssue && tweQualificationDateOfIssue.month < 10) {
    //   tweQualificationDateOfIssueMonth = '0' + tweQualificationDateOfIssue.month;
    // } else {
    //   tweQualificationDateOfIssueMonth = tweQualificationDateOfIssue.month;
    // }

    // if (tweQualificationDateOfIssue && tweQualificationDateOfIssue.day < 10) {
    //   tweQualificationDateOfIssueDay = '0' + tweQualificationDateOfIssue.day;
    // } else {
    //   tweQualificationDateOfIssueDay = tweQualificationDateOfIssue.day;
    // }


    // if (theQualificationDateOfIssue.month < 10) {
    //   theQualificationDateOfIssueMonth = '0' + theQualificationDateOfIssue.month;
    // } else {
    //   theQualificationDateOfIssueMonth = theQualificationDateOfIssue.month;
    // }
    // if (theQualificationDateOfIssue.day < 10) {
    //   theQualificationDateOfIssueDay = '0' + theQualificationDateOfIssue.day;
    // } else {
    //   theQualificationDateOfIssueDay = theQualificationDateOfIssue.day;
    // }

    // if (drivingLicenseDetailsDateIssue && drivingLicenseDetailsDateIssue.month < 10) {
    //   drivingLicenseDetailsDateIssueMonth = '0' + dob.month;
    // } else {
    //   drivingLicenseDetailsDateIssueMonth = drivingLicenseDetailsDateIssue.month;
    // }
    // if (drivingLicenseDetailsDateIssue && drivingLicenseDetailsDateIssue.day < 10) {
    //   drivingLicenseDetailsDateIssueDay = '0' + drivingLicenseDetailsDateIssue.day;
    // } else {
    //   drivingLicenseDetailsDateIssueDay = drivingLicenseDetailsDateIssue.day;
    // }

    // if (drivingLicenseDetailsValidateDate && drivingLicenseDetailsValidateDate.month < 10) {
    //   drivingLicenseDetailsValidateDateMonth = '0' + drivingLicenseDetailsValidateDate.month;
    // } else {
    //   drivingLicenseDetailsValidateDateMonth = drivingLicenseDetailsValidateDate.month;
    // }
    // if (drivingLicenseDetailsValidateDate && drivingLicenseDetailsValidateDate.day < 10) {
    //   drivingLicenseDetailsValidateDateDay = '0' + drivingLicenseDetailsValidateDate.day;
    // } else {
    //   drivingLicenseDetailsValidateDateDay = drivingLicenseDetailsValidateDate.day;
    // }

    // const selectedDOB = dob.year + '-' + dobMonth + '-' + dobDay;
    // const selectedTweQualificationDateOfIssue = tweQualificationDateOfIssue.year + '-' + tweQualificationDateOfIssueMonth + '-' + tweQualificationDateOfIssueDay;
    // const selectedTheQualificationDateOfIssue = theQualificationDateOfIssue.year + '-' + theQualificationDateOfIssueMonth + theQualificationDateOfIssueDay;
    // const selecteddrivingLicenseDetailsDateIssue = drivingLicenseDetailsDateIssue.year + '-' + drivingLicenseDetailsDateIssueMonth + '-' + drivingLicenseDetailsDateIssueDay;
    // const selecteddrivingLicenseDetailsValidateDate = drivingLicenseDetailsValidateDate.year + '-' + drivingLicenseDetailsValidateDateMonth + '-' + drivingLicenseDetailsValidateDateDay;
    if (this.applicationForm.controls['theQualificationBoardId'].value) {


      const otherQualificationscourseName = this.qualificationList.filter(x => x.id == this.applicationForm.controls['otherQualificationscourseId'].value)
      console.log('otherQualificationscourseId ', otherQualificationscourseName)
      if (this.applicationForm.controls['otherQualificationscourseId'].value) {
        console.log('this.additionalQualificationDetails ', this.additionalQualificationDetails);
        console.log('otherQualificationscourseId ', this.applicationForm.controls['otherQualificationscourseId'].value);
        const existingStatus = this.additionalQualificationDetails.indexOf(x => x.courseId == this.applicationForm.controls['otherQualificationscourseId'].value)
        console.log('existingStatus ', existingStatus);
        if (existingStatus == -1) {
          this.additionalQualificationDetails.push({
            courseId: this.applicationForm.controls['otherQualificationscourseId'].value,
            yearOfPassing: this.applicationForm.controls['otherQualificationsYearOfPassing'].value,
            nameOfInstitute: this.applicationForm.controls['otherQualificationsNameOfInstitute'].value,
            otherQualificationscourseName: otherQualificationscourseName[0].name
          });
        } else {
          console.log('Not pushed')
        }
        const additionalQualificationDetails = this.additionalQualificationDetails;
        // this.additionalQualificationDetails = [];
        // additionalQualificationDetails.forEach((x => {
        //   if (this.items.indexOf(item) == -1) {
        //     this.items.push(item);
        //   }
        //   const existing = this.additionalQualificationDetails.indexOf((y) => y.courseId == x.courseId);
        //   if (existing == -1) {
        //     this.additionalQualificationDetails.push(x)
        //   }
        // }))
        console.log('this.additionalQualificationDetails ', this.additionalQualificationDetails)
      }

    }

    const undertakingreadInstruction = this.applicationForm.controls['undertakingreadInstruction'].value == true ? 'Y' : 'N';
    const undertakinginfoCorrect = this.applicationForm.controls['undertakinginfoCorrect'].value == true ? 'Y' : 'N'
    const datePipe = new DatePipe('en-US');
    const transformedDob = datePipe.transform(this.applicationForm.controls['dob'].value, 'yyyy-MM-dd');
    const transformedtweQualificationDateOfIssue = datePipe.transform(this.applicationForm.controls['tweQualificationDateOfIssue'].value, 'yyyy-MM-dd');
    const transformedtheQualificationDateOfIssue = datePipe.transform(this.applicationForm.controls['theQualificationDateOfIssue'].value, 'yyyy-MM-dd');
    const transformeddrivingLicenseDetailsDateIssue = datePipe.transform(this.applicationForm.controls['drivingLicenseDetailsDateIssue'].value, 'yyyy-MM-dd');
    const transformeddrivingLicenseDetailsValidateDate = datePipe.transform(this.applicationForm.controls['drivingLicenseDetailsValidateDate'].value, 'yyyy-MM-dd');
    this.saveApplicationPayload = {
      // hpBonafideNo: this.applicationForm.controls['hpBonafideNo'].value,
      msisdn: this.applicationForm.controls['msisdn'].value,
      sportsCategory: this.applicationForm.controls['sportsCategory'].value || null,
      fullName: this.applicationForm.controls['fullName'].value || null,
      fatherName: this.applicationForm.controls['fatherName'].value,
      dob: transformedDob,
      identificationMark: this.applicationForm.controls['identificationMark'].value,
      hpBonafideCertifcateNo: this.applicationForm.controls['hpBonafideNo'].value,
      gender: this.applicationForm.controls['gender'].value,
      aadhaar: this.applicationForm.controls['aadhaar'].value,
      tweQualification: {
        boardId: this.applicationForm.controls['tweQualificationBoardId'].value,
        status: this.applicationForm.controls['tweQualificationStatus'].value,
        certificateNumber: this.applicationForm.controls['tweQualificationCertificateNumber'].value,
        dateOfIssue: transformedtweQualificationDateOfIssue
      },
      theQualification: {
        boardId: this.applicationForm.controls['theQualificationBoardId'].value,
        certificateNumber: this.applicationForm.controls['theQualificationCertificateNumber'].value,
        dateOfIssue: transformedtheQualificationDateOfIssue
      },
      otherQualifications: this.additionalQualificationDetails,
      perAddress: {
        addressType: '1',
        district: this.applicationForm.controls['perAddressDistrict'].value,
        tehsil: this.applicationForm.controls['perAddressTehsil'].value,
        block: this.applicationForm.controls['perAddressBlock'].value,
        panchayat: this.applicationForm.controls['perAddressPanchayat'].value,
        fullAddress: this.applicationForm.controls['perAddressFullAddress'].value
      },
      corAddress: {
        addressType: 2,
        state: this.applicationForm.controls['corAddressState'].value,
        district: this.applicationForm.controls['corAddressDistrict'].value,
        // tehsil: this.applicationForm.controls['corAddressTehsil'].value,
        // block: this.applicationForm.controls['corAddressBlock'].value,
        // panchayat: this.applicationForm.controls['corAddressPanchayat'].value,
        fullAddress: this.applicationForm.controls['corAddressFullAddress'].value
      },
      postAppliedFor: this.applicationForm.controls['postAppliedFor'].value || !this.enableDriverPost,
      drivingLicenseDetails: {
        dlNumber: this.applicationForm.controls['drivingLicenseDetailsDlNumber'].value,
        issuingAuthority: this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].value,
        vehicleType: this.applicationForm.controls['drivingLicenseDetailsVehicleType'].value,
        dateIssue: transformeddrivingLicenseDetailsDateIssue,
        validateDate: transformeddrivingLicenseDetailsValidateDate
      },
      categoryId: this.applicationForm.controls['categoryId'].value,
      subCategoryId: this.applicationForm.controls['subCategoryId'].value,
      isGorkha: this.applicationForm.controls['isGorkha'].value,
      undertaking: {
        readInstruction: this.applicationForm.controls['undertakingreadInstruction'].value == true ? 'Y' : 'N',
        infoCorrect: this.applicationForm.controls['undertakinginfoCorrect'].value == true ? 'Y' : 'N',
        isAccused: this.applicationForm.controls['undertakingisAccused'].value,
        isProceeding: this.applicationForm.controls['undertakingisProceeding'].value,
        firDetails: {
          state: this.applicationForm.controls['undertakingfirDetailsState'].value,
          district: this.applicationForm.controls['undertakingfirDetailsDistrict'].value,
          ploiceStation: this.applicationForm.controls['undertakingfirDetailsPloiceStation'].value,
          year: this.applicationForm.controls['undertakingfirDetailsYear'].value,
          firNumber: this.applicationForm.controls['undertakingfirDetailsFirNumber'].value,
          otherInfo: this.applicationForm.controls['undertakingfirDetailsOtherInfo'].value,

        }
      },
      place: null,
      anyInfo: this.applicationForm.controls['anyInfo'].value
    };
    // console.log('errors ', this.applicationForm.errors);
    for (let el in this.applicationForm.controls) {
      if (this.applicationForm.controls[el].errors) {
        console.log('Errors ', el)
      }
    }
    this.submitApplicationForm = true;
    // console.log('Form Valid', this.applicationForm.valid);
    // console.log('this.fileObjPhoto ', this.fileObjPhoto)
    // console.log('this.fileObjPhoto ', this.fileObjSignature)
    if (this.applicationForm.controls['noPosts'].value !== 0) {
      if (this.applicationForm.valid) {
        if (undertakingreadInstruction == 'Y' && undertakinginfoCorrect == 'Y' && this.fileObjPhoto && this.fileObjSignature) {
          this.setPreviewValues();
        } else {
          if (this.fileObjPhoto == undefined) {
            this.sharedService.showWarning('Please upload image');
          } if (this.fileObjSignature == undefined) {
            this.sharedService.showWarning('Please upload signature');
          } if (undertakingreadInstruction !== 'Y' && undertakinginfoCorrect !== 'Y') {
            this.sharedService.showWarning('Please validate Undertaking');
          }
        }
      } else {
        this.sharedService.showWarning('Please complete the form');
      }
    } else {
      this.sharedService.showWarning('No post is available for the selected category');
    }


    // if (undertakingreadInstruction == 'Y' && undertakinginfoCorrect == 'Y') {
    //   this.submitApplicationForm = true;
    //   // console.log('1 Check', undertakingreadInstruction + '     ', undertakinginfoCorrect)
    //   // tslint:disable-next-line:max-line-length
    //   if (this.applicationForm.controls['fatherName'].value != '' && this.applicationForm.controls['identificationMark'].value != '' && this.applicationForm.controls['undertakingisAccused'].value != '') {
    //     // console.log('2 Check')
    //     // this.enablePayment = true;
    //     // this.disableSubmit = false;
    //     // this.applicationService.saveApplication(reqObj).then((resp: any) => {
    //     //   if (resp.status == 200) {
    //     //     if (resp['body']['responseCode'] == 200) {
    //     //       this.save = true;
    //     //       this.sharedService.showSuccess('Application submitted successfully')
    //     //       this.applicationForm.disable();
    //     //       console.log('RESP', resp['body']['responseObject'])
    //     //     }
    //     //   }
    //     // })
    //     this.setPreviewValues();

    //   } else {
    //     console.log('1 error')
    //     this.sharedService.showWarning('Please complete the form');
    //   }
    // } else {
    //   console.log('2 error')
    //   this.sharedService.showWarning('Please validate Undertaking');
    // }

  }

  makePayment() {
    this.enablePayment = false;
    this.router.navigateByUrl('/Payment');
    // this.enablePrint = true;
    // this.payment = true;
  }

  postAppliedFor(val) {
    this.applicationForm.controls['categoryId'].setValue('');
    this.applicationForm.controls['subCategoryId'].setValue('');
    this.applicationForm.controls['noPosts'].setValue('');
    this.noPost = null;
    const post = this.applicationForm.controls['postAppliedFor'].value;
    console.log('Value : ', post)
    if (post == 'G') {
      this.enableDriverDetails = false;
    } else {
      this.enableDriverDetails = true;
    }
    if (this.enableDriverDetails == true) {
      this.applicationForm.controls['drivingLicenseDetailsDlNumber'].setValidators([Validators.required]);
      this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].setValidators([Validators.required]);
      this.applicationForm.controls['drivingLicenseDetailsVehicleType'].setValidators([Validators.required]);
      this.applicationForm.controls['drivingLicenseDetailsDateIssue'].setValidators([Validators.required]);
      this.applicationForm.controls['drivingLicenseDetailsValidateDate'].setValidators([Validators.required]);
    } else {
      this.applicationForm.controls['drivingLicenseDetailsDlNumber'].setValue('');
      this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].setValue('');
      this.applicationForm.controls['drivingLicenseDetailsVehicleType'].setValue('');
      this.applicationForm.controls['drivingLicenseDetailsDateIssue'].setValue('');
      this.applicationForm.controls['drivingLicenseDetailsValidateDate'].setValue('');

      this.applicationForm.controls['drivingLicenseDetailsDlNumber'].clearValidators();
      this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].clearValidators();
      this.applicationForm.controls['drivingLicenseDetailsVehicleType'].clearValidators();
      this.applicationForm.controls['drivingLicenseDetailsDateIssue'].clearValidators();
      this.applicationForm.controls['drivingLicenseDetailsValidateDate'].clearValidators();
    }
    this.applicationForm.controls['drivingLicenseDetailsDlNumber'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsVehicleType'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsDateIssue'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsValidateDate'].updateValueAndValidity();
    console.log('Value : ', val)
  }

  getFirStatus(status) {

    if (status == 'Y') {
      this.enableFirDetails = true;
    } else {
      this.enableFirDetails = false;
    }
    if (this.enableFirDetails == true) {
      this.applicationForm.controls['undertakingfirDetailsState'].setValidators([Validators.required]);
      this.applicationForm.controls['undertakingfirDetailsDistrict'].setValidators([Validators.required]);
      this.applicationForm.controls['undertakingfirDetailsPloiceStation'].setValidators([Validators.required]);
      this.applicationForm.controls['undertakingfirDetailsYear'].setValidators([Validators.required]);
      this.applicationForm.controls['undertakingfirDetailsFirNumber'].setValidators([Validators.required]);
    } else {
      this.applicationForm.controls['undertakingfirDetailsState'].setValue('');
      this.applicationForm.controls['undertakingfirDetailsDistrict'].setValue('');
      this.applicationForm.controls['undertakingfirDetailsPloiceStation'].setValue('');
      this.applicationForm.controls['undertakingfirDetailsYear'].setValue('');
      this.applicationForm.controls['undertakingfirDetailsFirNumber'].setValue('');

      this.applicationForm.controls['undertakingfirDetailsState'].clearValidators();
      this.applicationForm.controls['undertakingfirDetailsDistrict'].clearValidators();
      this.applicationForm.controls['undertakingfirDetailsPloiceStation'].clearValidators();
      this.applicationForm.controls['undertakingfirDetailsYear'].clearValidators();
      this.applicationForm.controls['undertakingfirDetailsFirNumber'].clearValidators();
    }
    this.applicationForm.controls['undertakingfirDetailsState'].updateValueAndValidity();
    this.applicationForm.controls['undertakingfirDetailsDistrict'].updateValueAndValidity();
    this.applicationForm.controls['undertakingfirDetailsPloiceStation'].updateValueAndValidity();
    this.applicationForm.controls['undertakingfirDetailsYear'].updateValueAndValidity();
    this.applicationForm.controls['undertakingfirDetailsFirNumber'].updateValueAndValidity();
    console.log('Status: ', status)
  }

  selectGender(status) {
    this.applicationForm.controls['drivingLicenseDetailsDlNumber'].clearValidators();
    this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].clearValidators();
    this.applicationForm.controls['drivingLicenseDetailsVehicleType'].clearValidators();
    this.applicationForm.controls['drivingLicenseDetailsDateIssue'].clearValidators();
    this.applicationForm.controls['drivingLicenseDetailsValidateDate'].clearValidators();
    this.applicationForm.controls['drivingLicenseDetailsDlNumber'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsVehicleType'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsDateIssue'].updateValueAndValidity();
    this.applicationForm.controls['drivingLicenseDetailsValidateDate'].updateValueAndValidity();

    this.applicationForm.controls['drivingLicenseDetailsDlNumber'].setValue('');
    this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].setValue('');
    this.applicationForm.controls['drivingLicenseDetailsVehicleType'].setValue('')
    this.applicationForm.controls['drivingLicenseDetailsDateIssue'].setValue('');
    this.applicationForm.controls['drivingLicenseDetailsValidateDate'].setValue('');
    this.applicationForm.controls['categoryId'].setValue('');
    this.applicationForm.controls['subCategoryId'].setValue('');
    this.applicationForm.controls['noPosts'].setValue('');
    this.noPost = null;
    this.enableDriverDetails = false;
    // tslint:disable-next-line:triple-equals
    if (status == 'M') {
      this.enableDriverPost = true;
      // this.enableDriverDetails = true;
    } else {
      this.applicationForm.controls['postAppliedFor'].setValue('G');
      // this.enableDriverDetails = false;
      this.enableDriverPost = false;
    }
    console.log('Status: ', status)
  }

  getSelectedStatus(status) {
    if (status == 'A') {
      this.applicationForm.controls['tweQualificationCertificateNumber'].setValue('');
      this.applicationForm.controls['tweQualificationDateOfIssue'].setValue('');
      this.enableCertificateDetails = true;
    } else {
      this.enableCertificateDetails = false;
    }
  }

  checkInstructions(event) {
    if (event == true) {
      this.enableConfirmationButton = false;
    } else {
      this.enableConfirmationButton = true;
    }
    console.log('Event ', event)
  }

  getSelectedSubCategory(event) {

    console.log('!this.enableDriverPost ', !this.enableDriverPost)

    console.log('!this.enableDriverPost ', this.applicationForm.controls['postAppliedFor'].value)
    let postType;
    // tslint:disable-next-line:triple-equals
    if (this.applicationForm.controls['gender'].value == 'F') {
      postType = 'G'
    } else {
      postType = this.applicationForm.controls['postAppliedFor'].value;
    }

    if (postType && this.applicationForm.controls['dob'].value && this.applicationForm.controls['perAddressDistrict'].value && this.applicationForm.controls['categoryId'].value && this.applicationForm.controls['gender'].value) {
      const dob = this.applicationForm.controls['dob'].value;
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
        isGorkha: this.applicationForm.controls['isGorkha'].value == 'Y' ? 'Y' : 'N',
        dob: this.applicationForm.controls['dob'].value,
        districtId: this.applicationForm.controls['perAddressDistrict'].value,
        postType: postType,
        category: this.applicationForm.controls['categoryId'].value,
        subCategory: this.applicationForm.controls['subCategoryId'].value,
        gender: this.applicationForm.controls['gender'].value
      }
      this.applicationService.post(reqObj).then((resp: any) => {
        if (resp.status == 200) {
          if (resp['body']['responseCode'] == 200) {
            if (resp['body']['responseObject'].post == 0) {
              this.sharedService.showWarning(resp['body']['responseObject'].message)
              this.applicationForm.controls['noPosts'].setValue(0);
              this.noPost = 'Not Available';
            } else {
              this.noPost = 'Available';
              this.applicationForm.controls['noPosts'].setValue(resp['body']['responseObject'].post);
            }
          } else {
            this.applicationForm.controls['noPosts'].setValue(0);
            this.noPost = 'Not Available';
            this.sharedService.showWarning(resp['body']['responseDesc']);

          }
        }
      })
    } else {
      this.sharedService.showWarning('Please complete the form');
    }

  }

  geDob(event) {
    console.log('event ', this.applicationForm.controls['dob'].value)
    const datePipe = new DatePipe('en-US');
    const transformedDate = datePipe.transform(this.applicationForm.controls['dob'].value, 'yyyy-MM-dd');
    // this.applicationForm.controls['dob'].setValue(transformedDate);
    // console.log('transformedDate', transformedDate);
    this.applicationForm.controls['subCategoryId'].setValue('');
    this.noPost = null;
  }

  setPreviewValues() {
    console.log("this.applicationForm.controls['aadhaar'].value ", this.applicationForm.controls['aadhaar'].value)

    this.applicationPreviewForm.controls['msisdn'].setValue(this.applicationForm.controls['msisdn'].value);
    this.applicationPreviewForm.controls['sportsCategoryMainId'].setValue(this.applicationForm.controls['sportsCategoryMainId'].value);
    this.applicationPreviewForm.controls['sportsCategory'].setValue(this.applicationForm.controls['sportsCategory'].value);

    const otherQualificationscourseName = this.qualificationList.filter(x => x.id == this.applicationForm.controls['otherQualificationscourseId'].value)
    this.applicationPreviewForm.controls['tweQualificationStatus'].setValue(this.applicationForm.controls['tweQualificationStatus'].value);
    this.applicationPreviewForm.controls['isGorkha'].setValue(this.applicationForm.controls['isGorkha'].value);
    this.applicationPreviewForm.controls['categoryId'].setValue(this.applicationForm.controls['categoryId'].value);
    this.applicationPreviewForm.controls['aadhaar'].setValue(this.applicationForm.controls['aadhaar'].value);
    this.applicationPreviewForm.controls['corAddressDistrict'].setValue(this.applicationForm.controls['corAddressDistrict'].value);
    this.applicationPreviewForm.controls['corAddressFullAddress'].setValue(this.applicationForm.controls['corAddressFullAddress'].value);
    this.applicationPreviewForm.controls['corAddressState'].setValue(this.applicationForm.controls['corAddressState'].value);
    this.applicationPreviewForm.controls['dob'].setValue(this.applicationForm.controls['dob'].value);
    this.applicationPreviewForm.controls['drivingLicenseDetailsDateIssue'].setValue(this.applicationForm.controls['drivingLicenseDetailsDateIssue'].value);
    this.applicationPreviewForm.controls['drivingLicenseDetailsDlNumber'].setValue(this.applicationForm.controls['drivingLicenseDetailsDlNumber'].value);
    // tslint:disable-next-line:max-line-length
    this.applicationPreviewForm.controls['drivingLicenseDetailsIssuingAuthority'].setValue(this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].value);
    this.applicationPreviewForm.controls['drivingLicenseDetailsValidateDate'].setValue(this.applicationForm.controls['drivingLicenseDetailsValidateDate'].value);
    this.applicationPreviewForm.controls['drivingLicenseDetailsVehicleType'].setValue(this.applicationForm.controls['drivingLicenseDetailsVehicleType'].value);
    this.applicationPreviewForm.controls['fatherName'].setValue(this.applicationForm.controls['fatherName'].value);
    this.applicationPreviewForm.controls['fullName'].setValue(this.applicationForm.controls['fullName'].value);
    this.applicationPreviewForm.controls['gender'].setValue(this.applicationForm.controls['gender'].value);
    this.applicationPreviewForm.controls['hpBonafideCertifcateNo'].setValue(this.applicationForm.controls['hpBonafideNo'].value);
    this.applicationPreviewForm.controls['identificationMark'].setValue(this.applicationForm.controls['identificationMark'].value);

    this.applicationPreviewForm.controls['otherQualificationscourseId'].setValue(this.applicationForm.controls['otherQualificationscourseId'].value);

    this.applicationPreviewForm.controls['otherQualificationsNameOfInstitute'].setValue(this.applicationForm.controls['otherQualificationsNameOfInstitute'].value);
    this.applicationPreviewForm.controls['otherQualificationsYearOfPassing'].setValue(this.applicationForm.controls['otherQualificationsYearOfPassing'].value);
    this.applicationPreviewForm.controls['perAddressAddressType'].setValue(this.applicationForm.controls['perAddressAddressType'].value);
    this.applicationPreviewForm.controls['perAddressBlock'].setValue(this.applicationForm.controls['perAddressBlock'].value);
    this.applicationPreviewForm.controls['perAddressDistrict'].setValue(this.applicationForm.controls['perAddressDistrict'].value);
    this.applicationPreviewForm.controls['perAddressFullAddress'].setValue(this.applicationForm.controls['perAddressFullAddress'].value);
    this.applicationPreviewForm.controls['perAddressPanchayat'].setValue(this.applicationForm.controls['perAddressPanchayat'].value);
    this.applicationPreviewForm.controls['perAddressTehsil'].setValue(this.applicationForm.controls['perAddressTehsil'].value);
    this.applicationPreviewForm.controls['postAppliedFor'].setValue(this.applicationForm.controls['postAppliedFor'].value || !this.enableDriverPost);
    this.applicationPreviewForm.controls['subCategoryId'].setValue(this.applicationForm.controls['subCategoryId'].value);
    this.applicationPreviewForm.controls['theQualificationBoardId'].setValue(this.applicationForm.controls['theQualificationBoardId'].value);
    this.applicationPreviewForm.controls['hpBonafideNo'].setValue(this.applicationForm.controls['hpBonafideNo'].value);
    // this.applicationForm.controls['hpBonafideNo'].value
    this.applicationPreviewForm.controls['theQualificationCertificateNumber'].setValue(this.applicationForm.controls['theQualificationCertificateNumber'].value);
    this.applicationPreviewForm.controls['theQualificationDateOfIssue'].setValue(this.applicationForm.controls['theQualificationDateOfIssue'].value);
    this.applicationPreviewForm.controls['tweQualificationBoardId'].setValue(this.applicationForm.controls['tweQualificationBoardId'].value);
    this.applicationPreviewForm.controls['tweQualificationCertificateNumber'].setValue(this.applicationForm.controls['tweQualificationCertificateNumber'].value);
    this.applicationPreviewForm.controls['tweQualificationDateOfIssue'].setValue(this.applicationForm.controls['tweQualificationDateOfIssue'].value);
    this.applicationPreviewForm.controls['undertakingisProceeding'].setValue(this.applicationForm.controls['undertakingisProceeding'].value);
    this.applicationPreviewForm.controls['undertakingreadInstruction'].setValue(this.applicationForm.controls['undertakingreadInstruction'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsDistrict'].setValue(this.applicationForm.controls['undertakingfirDetailsDistrict'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsFirNumber'].setValue(this.applicationForm.controls['undertakingfirDetailsFirNumber'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsOtherInfo'].setValue(this.applicationForm.controls['undertakingfirDetailsOtherInfo'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsPlace'].setValue(this.applicationForm.controls['undertakingfirDetailsPlace'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsPloiceStation'].setValue(this.applicationForm.controls['undertakingfirDetailsPloiceStation'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsState'].setValue(this.applicationForm.controls['undertakingfirDetailsState'].value);
    this.applicationPreviewForm.controls['undertakingfirDetailsYear'].setValue(this.applicationForm.controls['undertakingfirDetailsYear'].value);
    this.applicationPreviewForm.controls['undertakingisAccused'].setValue(this.applicationForm.controls['undertakingisAccused'].value);
    this.applicationPreviewForm.controls['undertakinginfoCorrect'].setValue(this.applicationForm.controls['undertakinginfoCorrect'].value);
    this.applicationPreviewForm.controls['noPosts'].setValue(this.applicationForm.controls['noPosts'].value);
    this.applicationPreviewForm.controls['anyInfo'].setValue(this.applicationForm.controls['anyInfo'].value);
    this.applicationPreviewForm.disable();
    this.openXlModal(this.applicationPreview);
  }

  addNewQualificationForm() {
    this.enableForm = true;
    this.applicationPreviewForm.controls['otherQualificationscourseId'].setValue('');
    this.applicationPreviewForm.controls['otherQualificationsYearOfPassing'].setValue('');
    this.applicationPreviewForm.controls['otherQualificationsNameOfInstitute'].setValue('');
  }

  additionalQualification() {

    const otherQualificationscourseName = this.qualificationList.filter(x => x.id == this.applicationForm.controls['otherQualificationscourseId'].value)
    console.log('otherQualificationscourseId ', otherQualificationscourseName)

    const reqObj = {
      courseId: this.applicationForm.controls['otherQualificationscourseId'].value,
      yearOfPassing: this.applicationForm.controls['otherQualificationsYearOfPassing'].value,
      nameOfInstitute: this.applicationForm.controls['otherQualificationsNameOfInstitute'].value,
      otherQualificationscourseName: otherQualificationscourseName[0].name
    }
    this.additionalQualificationDetails.push(reqObj);
    console.log('this.additionalQualificationDetails ', this.additionalQualificationDetails)
    this.applicationForm.controls['otherQualificationscourseId'].setValue('');
    this.applicationForm.controls['otherQualificationsYearOfPassing'].setValue('');
    this.applicationForm.controls['otherQualificationsNameOfInstitute'].setValue('');
    this.enableForm = false;
  }

  deleteAdditionalQualification(x) {
    // this.additionalQualificationDetails = [];
    this.sharedService.deleteFromArray(this.additionalQualificationDetails, x).then((resp: any) => {
      this.additionalQualificationDetails = resp;
      console.log('resp ', resp)
    })
  }

  saveApplicationAsDraft() {
    console.log('!this.enableDriverPost ', !this.enableDriverPost)
    const enableDriverPost = !this.enableDriverPost == true ? 'G' : null
    const datePipe = new DatePipe('en-US');
    const transformedDob = datePipe.transform(this.applicationForm.controls['dob'].value, 'yyyy-MM-dd');
    const transformedtweQualificationDateOfIssue = datePipe.transform(this.applicationForm.controls['tweQualificationDateOfIssue'].value, 'yyyy-MM-dd');
    const transformedtheQualificationDateOfIssue = datePipe.transform(this.applicationForm.controls['theQualificationDateOfIssue'].value, 'yyyy-MM-dd');
    const transformeddrivingLicenseDetailsDateIssue = datePipe.transform(this.applicationForm.controls['drivingLicenseDetailsDateIssue'].value, 'yyyy-MM-dd');
    const transformeddrivingLicenseDetailsValidateDate = datePipe.transform(this.applicationForm.controls['drivingLicenseDetailsValidateDate'].value, 'yyyy-MM-dd');

    this.saveApplicationPayload = {
      // hpBonafideNo: this.applicationForm.controls['hpBonafideNo'].value,
      fullName: this.applicationForm.controls['fullName'].value || null,
      fatherName: this.applicationForm.controls['fatherName'].value,
      dob: transformedDob,
      identificationMark: this.applicationForm.controls['identificationMark'].value,
      hpBonafideCertifcateNo: this.applicationForm.controls['hpBonafideNo'].value,
      gender: this.applicationForm.controls['gender'].value,
      aadhaar: this.applicationForm.controls['aadhaar'].value,
      tweQualification: {
        boardId: this.applicationForm.controls['tweQualificationBoardId'].value,
        status: this.applicationForm.controls['tweQualificationStatus'].value,
        certificateNumber: this.applicationForm.controls['tweQualificationCertificateNumber'].value,
        dateOfIssue: transformedtweQualificationDateOfIssue
      },
      isGorkha: this.applicationForm.controls['isGorkha'].value == 'Y' ? 'Y' : 'N',
      theQualification: {
        boardId: this.applicationForm.controls['theQualificationBoardId'].value,
        certificateNumber: this.applicationForm.controls['theQualificationCertificateNumber'].value,
        dateOfIssue: transformedtheQualificationDateOfIssue
      },
      otherQualifications: this.additionalQualificationDetails,
      perAddress: {
        addressType: '1',
        district: this.applicationForm.controls['perAddressDistrict'].value,
        tehsil: this.applicationForm.controls['perAddressTehsil'].value,
        block: this.applicationForm.controls['perAddressBlock'].value,
        panchayat: this.applicationForm.controls['perAddressPanchayat'].value,
        fullAddress: this.applicationForm.controls['perAddressFullAddress'].value
      },
      corAddress: {
        addressType: 2,
        state: this.applicationForm.controls['corAddressState'].value,
        district: this.applicationForm.controls['corAddressDistrict'].value,
        // tehsil: this.applicationForm.controls['corAddressTehsil'].value,
        // block: this.applicationForm.controls['corAddressBlock'].value,
        // panchayat: this.applicationForm.controls['corAddressPanchayat'].value,
        fullAddress: this.applicationForm.controls['corAddressFullAddress'].value
      },
      postAppliedFor: this.applicationForm.controls['postAppliedFor'].value || enableDriverPost,
      drivingLicenseDetails: {
        dlNumber: this.applicationForm.controls['drivingLicenseDetailsDlNumber'].value,
        issuingAuthority: this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].value,
        vehicleType: this.applicationForm.controls['drivingLicenseDetailsVehicleType'].value,
        dateIssue: transformeddrivingLicenseDetailsDateIssue,
        validateDate: transformeddrivingLicenseDetailsValidateDate
      },
      categoryId: this.applicationForm.controls['categoryId'].value,
      subCategoryId: this.applicationForm.controls['subCategoryId'].value,
      undertaking: {
        readInstruction: this.applicationForm.controls['undertakingreadInstruction'].value == true ? 'Y' : 'N',
        infoCorrect: this.applicationForm.controls['undertakinginfoCorrect'].value == true ? 'Y' : 'N',
        isAccused: this.applicationForm.controls['undertakingisAccused'].value,
        isProceeding: this.applicationForm.controls['undertakingisProceeding'].value,
        firDetails: {
          state: this.applicationForm.controls['undertakingfirDetailsState'].value,
          district: this.applicationForm.controls['undertakingfirDetailsDistrict'].value,
          ploiceStation: this.applicationForm.controls['undertakingfirDetailsPloiceStation'].value,
          year: this.applicationForm.controls['undertakingfirDetailsYear'].value,
          firNumber: this.applicationForm.controls['undertakingfirDetailsFirNumber'].value,
          otherInfo: this.applicationForm.controls['undertakingfirDetailsOtherInfo'].value,

        }
      },
      place: null,
      anyInfo: this.applicationForm.controls['anyInfo'].value,
    };
    console.log('this.saveApplicationPayload ', this.saveApplicationPayload)
    this.applicationService.saveDraftApplication(this.saveApplicationPayload).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.enablePayment = false;
          this.disableSubmit = true;
          this.save = false;
          this.sharedService.showSuccess('Draft of your application is saved')
          // this.applicationForm;
          console.log('RESP', resp['body']['responseObject'])
        } else {
          this.sharedService.showError(resp['body']['responseDesc'])
        }
      }
    })
  }


  getDateOfIssueofCertificate(event) {
    // const todayDate = new Date();
    // if (event > todayDate) {
    //   this.applicationForm.controls['theQualificationDateOfIssue'].setValue('');
    //   this.sharedService.showWarning('Please select valid date');
    // }
    console.log('DATE ', event)
  }

  dispayDraftApplication() {
    this.applicationService.getApplicationN().then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          const response = resp['body']['responseObject']
          // this.applicationForm.controls['categoryId'].setValue(response.categoryId || '');
          // this.applicationForm.controls['aadhaar'].setValue(response.aadhaar || '');

          // this.applicationForm.controls['corAddressDistrict'].setValue(response.corAddress.districtId || '');
          this.applicationForm.controls['corAddressFullAddress'].setValue(response.corAddress.fullAddress || '');
          // this.applicationForm.controls['corAddressState'].setValue(response.corAddress.stateId || '');

          // this.applicationForm.controls['dob'].setValue(response.dob || '');

          this.applicationForm.controls['drivingLicenseDetailsDateIssue'].setValue(response.drivingLicenseDetailsDateIssue || '');
          this.applicationForm.controls['drivingLicenseDetailsDlNumber'].setValue(response.drivingLicenseDetailsDlNumber || '');
          // tslint:disable-next-line:max-line-length
          this.applicationForm.controls['drivingLicenseDetailsIssuingAuthority'].setValue(response.drivingLicenseDetailsIssuingAuthority || '');
          this.applicationForm.controls['drivingLicenseDetailsValidateDate'].setValue(response.drivingLicenseDetailsValidateDate || '');
          this.applicationForm.controls['drivingLicenseDetailsVehicleType'].setValue(response.drivingLicenseDetailsVehicleType || '');

          this.applicationForm.controls['fatherName'].setValue(response.fatherName || '');
          this.applicationForm.controls['fullName'].setValue(response.fullName || '');
          this.applicationForm.controls['gender'].setValue(response.gender + '' || '');
          this.applicationForm.controls['hpBonafideNo'].setValue(response.hpBonafideCertifcateNo || '');
          this.applicationForm.controls['identificationMark'].setValue(response.identificationMark || '');

          this.applicationForm.controls['otherQualificationscourseId'].setValue(response.otherQualificationscourseId || '');
          this.applicationForm.controls['otherQualificationsNameOfInstitute'].setValue(response.otherQualificationsNameOfInstitute || '');
          this.applicationForm.controls['otherQualificationsYearOfPassing'].setValue(response.otherQualificationsYearOfPassing || '');

          // this.applicationForm.controls['perAddressAddressType'].setValue(response.perAddress.);
          // this.applicationForm.controls['perAddressBlock'].setValue(response.perAddress.blockId || '');
          // this.applicationForm.controls['perAddressDistrict'].setValue(response.perAddress.districtId || '');
          this.applicationForm.controls['perAddressFullAddress'].setValue(response.perAddress.fullAddress || '');
          // this.applicationForm.controls['perAddressPanchayat'].setValue(response.perAddress.panchayatId || '');
          // this.applicationForm.controls['perAddressTehsil'].setValue(response.perAddress.tehsilId || '');
          // this.applicationForm.controls['postAppliedFor'].setValue(response.postAppliedFor || !this.enableDriverPost);

          // this.applicationForm.controls['subCategoryId'].setValue(response.subCategoryId || '');
          // this.applicationForm.controls['hpBonafideNo'].setValue(response.hpBonafideNo || '');
          // this.applicationForm.controls['hpBonafideNo'].value

          this.applicationForm.controls['theQualificationBoardId'].setValue(response.theQualification.boardId || '');
          this.applicationForm.controls['theQualificationCertificateNumber'].setValue(response.theQualification.certificateNumber || '');
          this.applicationForm.controls['theQualificationDateOfIssue'].setValue(response.theQualification.dateOfIssue || '');

          this.applicationForm.controls['tweQualificationStatus'].setValue(response.tweQualification.status || '');
          if (response.tweQualification.status == 'A') {
            this.enableCertificateDetails = true;
            this.applicationForm.controls['tweQualificationCertificateNumber'].setValue('');
            this.applicationForm.controls['tweQualificationDateOfIssue'].setValue('');
          } else {
            this.enableCertificateDetails = false;
            this.applicationForm.controls['tweQualificationCertificateNumber'].setValue(response.tweQualification.certificateNumber || '');
            this.applicationForm.controls['tweQualificationDateOfIssue'].setValue(response.tweQualification.dateOfIssue || '');
          }
          this.applicationForm.controls['tweQualificationBoardId'].setValue(response.tweQualification.boardId || '');
          this.applicationForm.controls['undertakingisProceeding'].setValue(response.undertakingisProceeding || '');
          this.applicationForm.controls['undertakingreadInstruction'].setValue(response.undertakingreadInstruction || '');
          this.applicationForm.controls['undertakingfirDetailsDistrict'].setValue(response.undertakingfirDetailsDistrict || '');
          this.applicationForm.controls['undertakingfirDetailsFirNumber'].setValue(response.undertakingfirDetailsFirNumber || '');
          this.applicationForm.controls['undertakingfirDetailsOtherInfo'].setValue(response.undertakingfirDetailsOtherInfo || '');
          this.applicationForm.controls['undertakingfirDetailsPlace'].setValue(response.undertakingfirDetailsPlace || '');
          this.applicationForm.controls['undertakingfirDetailsPloiceStation'].setValue(response.undertakingfirDetailsPloiceStation || '');
          this.applicationForm.controls['undertakingfirDetailsState'].setValue(response.undertakingfirDetailsState || '');
          this.applicationForm.controls['undertakingfirDetailsYear'].setValue(response.undertakingfirDetailsYear || '');
          this.applicationForm.controls['undertakingisAccused'].setValue(response.undertakingisAccused || '');
          this.applicationForm.controls['undertakinginfoCorrect'].setValue(response.undertakinginfoCorrect || '');

          this.applicationForm.controls['noPosts'].setValue(response.noPosts || '');

          this.applicationForm.controls['anyInfo'].setValue(response.nyOtherDetails || '');
        }
      }
    });
  }

  // format(date: NgbDateStruct | null): string {
  //   return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  // }


  checkGorkha() {
    this.applicationForm.controls['categoryId'].setValue('');
    this.applicationForm.controls['subCategoryId'].setValue('');
    this.noPost = null;
  }

  getSelectedSportsCategory() {
    this.setSportsCategoryArray = [];
    console.log("this.applicationForm.controls['sportsCategoryMainId'].value ", this.applicationForm.controls['sportsCategoryMainId'].value)
    if (this.applicationForm.controls['sportsCategoryMainId'].value == 12) {
      this.setSportsCategoryArray = this.sportsSubCategory1Array;
    } else if (this.applicationForm.controls['sportsCategoryMainId'].value == 13) {
      this.setSportsCategoryArray = this.sportsSubCategory2Array;
    } else if (this.applicationForm.controls['sportsCategoryMainId'].value == 14) {
      this.setSportsCategoryArray = this.sportsSubCategory3Array;
    } else if (this.applicationForm.controls['sportsCategoryMainId'].value == 15) {
      this.setSportsCategoryArray = this.sportsSubCategory4Array;
    }

  }

}
