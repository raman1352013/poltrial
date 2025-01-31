import { Component, OnInit, EventEmitter, ViewChild, AfterViewChecked, Output, Compiler } from '@angular/core';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PATTER_VALIDATION } from '../../app.constants';
import { COMMONTEXT } from '../../app.constants';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from '../../services/user/user.service';
import { MasterService } from '../../services/master/master.service';
import { CommonService } from '../../services/common/common.service';
import $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('forgotPasswordDetails') forgotPasswordDetails;
  @ViewChild('forgotPasswordPopUp') forgotPasswordPopUp;
  loginForm: FormGroup;
  changePasswordForm: FormGroup;
  mobileForm: FormGroup;
  resp;
  formSubmitted = false;
  show = false;
  statusShow = false;
  validOtp = false;
  encRequest: String;
  accessCode: String;
  closeResult: string;
  @Output() userRole: EventEmitter<any> = new EventEmitter<any>();
  newPassword: any;
  conPassword: any;
  enableSubmit: any;
  mobileFormSubmitted = false;
  forgotPasswordDetailsformSubmitted = false;
  disableLoginButton = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private _compiler: Compiler,
    private userService: UserService,
    private masterService: MasterService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private applicationService: ApplicationService
  ) {
  }


  ngOnInit() {
    // window.location.reload();
    this._compiler.clearCache();
    this.sharedService.clearAllLocalStorage();
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      conPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });

    this.mobileForm = new FormGroup({
      msisdn: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
    });

  }

  showPwd() {
    this.statusShow = !this.statusShow;
    this.show = !this.show;
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.disableLoginButton = false;
    }
    console.log('Resolved captcha with response:', captchaResponse);
  }

  goToLogin() {
    this._compiler.clearCache();
    this.sharedService.clearAllLocalStorage();
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const md5 = new Md5();
      const password = window.btoa(this.loginForm.controls['password'].value)
      // window.btoa(str);
      const authObject = {
        userName: this.loginForm.controls['userName'].value,
        password: password
      };
      console.log(window.btoa(this.loginForm.controls['password'].value));
      this.userService.login(authObject).then((resp: any) => {
        if (resp.status = 200) {
          if (resp['body']['responseCode'] === 200) {
            const responseObj = resp['body'].responseObject;
            console.log('RESP : ', resp['body'].responseObject);
            // this.getUserRights();
            // this.router.navigateByUrl('/Home');
            if (responseObj.userType.id != 1) {
              this.sharedService.setLocalStorageItem('AccessToken', responseObj.tokenType + ' ' + responseObj.accessToken);
              this.sharedService.setLocalStorage('userData', responseObj.name);
              this.sharedService.setLocalStorage('userId', responseObj.userid);
              this.sharedService.setLocalStorage('userType', JSON.stringify(responseObj.userType));
              this.sharedService.setLocalStorage('district', JSON.stringify(responseObj.district));
              this.sharedService.setLocalStorageItem('isUserLogin', 'true');

              this.navigation(responseObj.userType);
            } else {
              this.sharedService.showWarning('Invalid username or password')
            }

            // this.callAllServices();
          } else {
            this.sharedService.showError(resp['body']['responseDesc']);
          }
        } else {
          this.sharedService.showError(resp['body']['responseDesc']);
        }
      }, error => {
        this.sharedService.showError(error);
      });
    } else {
      this.sharedService.showWarning(COMMONTEXT.INCOMPLETE_FORM);
    }
  }

  navigation(userType) {
    if (userType.id == 4) {
      this.router.navigateByUrl('/Attendance');
    } else if (userType.id == 5) {
      this.router.navigateByUrl('/Height');
    } else if (userType.id == 6) {
      this.router.navigateByUrl('/Chest');
    } else if (userType.id == 7) {
      this.router.navigateByUrl('/Race');
    } else if (userType.id == 8) {
      this.router.navigateByUrl('/BroadJump');
    } else if (userType.id == 9) {
      this.router.navigateByUrl('/HighJump');
    } else if (userType.id == 10) {
      this.router.navigateByUrl('/Driver');
    } else if (userType.id == 12) {
      this.router.navigateByUrl('/Appeal');
    } else if (userType.id == 14) {
      this.router.navigateByUrl('/IndividualResult');
    }  else if (userType.id == 15) {
      this.router.navigateByUrl('/ScheduleExam');
    } else if (userType.id == 16) {
      this.router.navigateByUrl('/DocVerificationReg');
    } else if (userType.id == 17) {
      this.router.navigateByUrl('/DocVerificationEduQualification');
    }  else if (userType.id == 18) {
      this.router.navigateByUrl('/DocVerificationBackwardArea');
    }  else if (userType.id == 19) {
      this.router.navigateByUrl('/DocVerificationLmv');
    }  else if (userType.id == 20) {
      this.router.navigateByUrl('/DocVerificationNcc');
    }  else if (userType.id == 21) {
      this.router.navigateByUrl('/DocVerificationAppeal');
    }  else if (userType.id == 22) {
      this.router.navigateByUrl('/DisqualifyCandidate');
    } else {
      this.router.navigateByUrl('/Home');
    }
  }

  getApplicationStatus() {
    this.applicationService.getApplicationStatus().then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          // this.displayApplication = true;
          console.log('RESP: ', resp['body']['responseObject']);
          const response = resp['body']['responseObject'];
          this.sharedService.setLocalStorageItem('userData', response.name);
          if (response.status == 2) {
            this.router.navigateByUrl('/Home');
          } else if (response.status == 3) {
            this.router.navigateByUrl('/Payment');
          } else if (response.status == 4) {
            this.router.navigateByUrl('/UserDashboard');
          } else {
            this.router.navigateByUrl('/Home');
          }
        }
      }
    });
  }

  callAllServices() {
    Promise.all([
      // this.states(),
      // this.genders(),
      // this.idProofs(),
      // this.qualifications(),
      // this.twelthBoard(),
      // this.tenthBoard()
    ]).then((values) => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          myId: 'heroId',
          foo: JSON.stringify(this.resp)
        }
      };
    }, (error) => {
    });
  }

  states() {
    this.masterService.states().then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('statesList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  genders() {
    this.masterService.genders().then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('genderList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  idProofs() {
    this.masterService.idProofs().then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('idProofList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  qualifications() {
    this.masterService.qualifications('OTH').then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('qualificationList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  twelthBoard() {
    this.masterService.boards(2).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('twelthBoardList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }

  tenthBoard() {
    this.masterService.boards(1).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.setLocalStorageItem('tenthBoardList', JSON.stringify(resp['body']['responseObject']));
        }
      }
    });
  }


  sendOtp() {
    const reqObj = {
      msisdn: this.mobileForm.controls['msisdn'].value,
      type: 1
    };
    this.commonService.sendOtp(reqObj).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
          console.log('True')
          this.open(this.forgotPasswordDetails);
        } else {
          this.sharedService.showWarning(resp['body']['responseDesc']);
        }
      }
    });
  }

  // getPaymentMode() {
  //   this.masterService.getPaymentMode().then((resp: any) => {
  //     if (resp.status === 200) {
  //       if (resp['body']['responseCode'] === 200) {
  //         this.sharedService.setLocalStorageItem('paymentMode', JSON.stringify(resp['body']['responseObject']));
  //       }
  //     }
  //   });
  // }


  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      console.log('Result: ', result)
      this.mobileFormSubmitted = false;
      this.forgotPasswordDetailsformSubmitted = false;
      if (result == 'Save click') {
        this.mobileFormSubmitted = true;
        this.sendOtp();
      } else if (result == 'Submit click') {
        this.forgotPasswordDetailsformSubmitted = true;
        this.resetPasswordWithOtp();
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

  getPassword(type) {
    if (type == 'n') {
      this.newPassword = this.changePasswordForm.controls['newPassword'].value;
    } else {
      this.conPassword = this.changePasswordForm.controls['conPassword'].value;
    }
    console.log('this.newPassword  ', this.newPassword)
    console.log('this.conPassword  ', this.conPassword)
    if (this.newPassword == this.conPassword) {
      if (this.changePasswordForm.controls['otp'].value) {
        this.enableSubmit = true;
      } else {
        this.enableSubmit = false;
      }
    } else {
      this.enableSubmit = false;
    }
  }

  resetPasswordWithOtp() {

    if (this.changePasswordForm.controls['newPassword'].value == this.changePasswordForm.controls['conPassword'].value) {
      const md5 = new Md5();
      const newPassword = window.btoa(this.changePasswordForm.controls['newPassword'].value)
      const reqObj = {
        msisdn: this.mobileForm.controls['msisdn'].value,
        otp: this.changePasswordForm.controls['otp'].value,
        newPassword: newPassword
      }
      this.userService.resetPasswordWithOtp(reqObj).then((resp: any) => {
        if (resp.status === 200) {
          if (resp['body']['responseCode'] === 200) {
            console.log('True')
            this.sharedService.showSuccess(resp['body']['responseDesc'])
            this.formSubmitted = false;
            this.initializeForm();
            this.modalService.dismissAll();
          } else {
            this.sharedService.showWarning(resp['body']['responseDesc'])
          }
        }
      });
    } else {
      this.sharedService.showWarning('New password and confirm password should be same')
    }

  }



}
