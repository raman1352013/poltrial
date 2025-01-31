import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationService } from '../../services/application/application.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  @ViewChild('consentPopUp') consentPopUp;
  @ViewChild('secondConsentPopUp') secondConsentPopUp;
  manageAdmitCardsForm: FormGroup;
  searchForm: FormGroup;
  qrResultString: string;
  enableScanner = false;
  enableForm = false;
  closeResult: string;
  photo: any;
  signature: any;
  status;
  response;
  fileObjPhoto: any;
  fileObjSignature: any;
  formDataPhoto: FormData;
  formDataSignature: FormData;
  enableUPload = null;
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
        if (resp.id !== 7 && resp.id !== 3) {
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
      isGorkha: new FormControl(''),
      hpBonafideCertifcateNo: new FormControl(''),
      photo: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
    });
  }


  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.enableScanner = false;
    console.log('qrResultString ', this.qrResultString)
    this.getApplicationSubmitted(this.qrResultString);
    // this.applicationService.getImageV2('P', this.qrResultString);
    // this.applicationService.getImageV2('S', this.qrResultString);
  }

  scanQr() {
    this.enableScanner = true;
  }


  getApplicationDetails() {
    this.getApplicationSubmitted(this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('P', this.searchForm.controls['applicationNumber'].value);
    // this.applicationService.getImageV2('S', this.searchForm.controls['applicationNumber'].value);
  }

  getApplicationSubmitted(application) {
    this.enableScanner = false;
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
          this.manageAdmitCardsForm.controls['postAppliedFor'].setValue(postDesc);
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

          // if (response.genderId == '1') {
          //   this.disableCalculation = true;
          // } else {
          //   this.disableCalculation = false;
          // }
          // this.getcategory(this.response.districtId);
          // this.getSelectedCategory(response.categoryId);
          // this.manageAdmitCardsForm.disable();
        } else {
          this.sharedService.confirm('Alert!!', resp['body']['responseDesc'], 'md').then((x: any) => {
            this.searchForm.controls['applicationNumber'].setValue('');
          });
        }

      }
    });
  }

  uploadImage(section) {
    this.fileObjSignature = undefined;
    this.fileObjPhoto = undefined;
    this.enableUPload = section;
    // if (section == 'P') {
    //   this.enableUPload = true;
    // } else if (section == 'S') {
    //   this.enableSignature = true;
    // }

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
              this.formDataPhoto.append('applicationId', this.response.applicationId);
              this.uploadFile(this.formDataPhoto);
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
              this.formDataSignature.append('applicationId', this.response.applicationId);
              this.uploadFile(this.formDataSignature);
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
    this.applicationService.uploadImageId(formDataAadhaar).then((resp: any) => {
      console.log('RESP : ' + JSON.stringify(resp));
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.sharedService.showSuccess(resp['body']['responseDesc']);
          // window.location.reload();
          this.getApplicationSubmitted(this.response.applicationNo)
          this.enableUPload = false;
          this.initializeForm();
        } else {
          this.sharedService.showError(resp['body']['responseDesc']);
        }
      } else {
        this.sharedService.showError(resp['body']['responseDesc']);
      }
    });
  }

  cancelUpload() {
    console.log('Cancel')
    this.enableUPload = false;
  }

}
