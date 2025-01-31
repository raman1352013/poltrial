import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service'
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { UserService } from '../../services/user/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user/user.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('forgotPasswordPopUp') forgotPasswordPopUp;
  changePasswordForm: FormGroup;
  formisvalid = true;
  userDetails = {
    userId: '',
    oldUserId: '',
    userIdConsent: '',
    userName: '',
    userTelephone: ''
  }
  closeResult;
  formSubmitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      conPassword: new FormControl('', [Validators.required])
    });
    $(function ($) {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(300);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(300);
          $(this)
            .parent()
            .addClass("active");
        }
      });



      $("#show-sidebar").click(function () {
        $(".page-wrapper").toggleClass("toggled");
      });

    });



    $(window).bind("resize", function () {
      if ($(this).width() < 1026) {
        $('.page-wrapper').removeClass('toggled');
      } else {
        $('.page-wrapper').addClass('toggled');

      }
    }).trigger('resize');


    $('.nav-icon').click(function () {
      $(this).toggleClass('open');
    });

    this.sharedService.getLocalStorageItem('userDetails').then((resp: any) => {
      if (resp) {
        this.userDetails.userName = resp.userName;
      }
    })
  }

  forgotPassword() {
    this.openPopUp(this.forgotPasswordPopUp);
  }

  openPopUp(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: <any>'md', centered: true, backdrop: 'static',
      keyboard: false
    }).result.then((result) => {
      if (result == 'Close click') {
        console.log('Closed')
      } else if (result == 'Save click') {
        this.submit();
        console.log('Submitted')
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



  logOut() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        reload: true
      }
    };
    this.router.navigateByUrl('/Login', navigationExtras)
    // this.router.navigate(['/Login'])
    // location.reload();
  }

  onOldPasswordKey(event) {
    const oldPassword = this.changePasswordForm.controls['oldPassword'].value;
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const conPassword = this.changePasswordForm.controls['conPassword'].value;
    if (oldPassword && newPassword && conPassword) {
      if (newPassword === conPassword) {
        this.formisvalid = false;
      } else {
        this.formisvalid = true;
      }
    } else {
      this.formisvalid = true;
    }
  }

  onNewPasswordKey() {
    const oldPassword = this.changePasswordForm.controls['oldPassword'].value;
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const conPassword = this.changePasswordForm.controls['conPassword'].value;
    if (oldPassword && newPassword && conPassword) {
      if (newPassword === conPassword) {
        this.formisvalid = false;
      } else {
        this.formisvalid = true;
      }
    } else {
      this.formisvalid = true;
    }
  }

  onConPassword() {
    const oldPassword = this.changePasswordForm.controls['oldPassword'].value;
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const conPassword = this.changePasswordForm.controls['conPassword'].value;
    if (oldPassword && newPassword && conPassword) {
      if (newPassword === conPassword) {
        this.formisvalid = false;
      } else {
        this.formisvalid = true;
      }
    } else {
      this.formisvalid = true;
    }
  }

  submit() {

    console.log('oldPassword ', this.changePasswordForm.controls['oldPassword'].value)
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const conPassword = this.changePasswordForm.controls['conPassword'].value;
    if (conPassword == newPassword) {
      const md5 = new Md5();

      const oldPassword = window.btoa(this.changePasswordForm.controls['oldPassword'].value);
      const newPasswordMD5 = window.btoa(this.changePasswordForm.controls['newPassword'].value);
      console.log('oldPassword ', oldPassword)
      const reqObj = {
        newPassword: newPasswordMD5,
        oldPassword: oldPassword

      };
      this.userService.changePassword(reqObj).then((resp: any) => {
        if (resp.status == 200) {
          if (resp['body']['responseCode'] == 200) {
            this.sharedService.showSuccess('Password has been changed successfully, please Re-login')
            const navigationExtras: NavigationExtras = {
              queryParams: {
                reload: true
              }
            };
            this.router.navigateByUrl('/Login', navigationExtras)
          } else {
            this.sharedService.showWarning(resp['body']['responseDesc'])
          }
        }
      })
    } else {
      this.sharedService.showWarning('New password and confirm password should be same!!')
    }

  }
}
