import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { error } from 'protractor';
import { NgxSpinnerService } from "ngx-spinner";
import { resolve } from 'url';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialog2Component } from '../../components/confirmation-dialog2/confirmation-dialog2.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userRoles;
  classList = [];
  bedArray = [];
  selectedBed = [];
  bookingInfo;
  bookingConfirmation;
  docData;
  requestInfo;
  recArray = [];
  constructor(
    private sanitizer: DomSanitizer,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  setLocalStorageItem(key, value) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem(key, value);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  getLocalStorageItem(key) {
    return new Promise((resolve, reject) => {
      try {
        let resJson = JSON.parse(sessionStorage.getItem(key));
        resolve(resJson);
      } catch (e) {
        reject(e);
      }
    });
  }

  clearLocalStorageItem(key) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.removeItem(key);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  separateTimeAndTimeFormat(str: string, delimeter: string): any[] {
    if (typeof str === undefined) {
      return [];
    } else {
      return str.split(delimeter);
    }
  }

  convertDateToTimeFormat(date: string): string {
    var recievedDate = new Date(date);
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return recievedDate.toLocaleString('en-US', options);
  }

  setLocalStorage(key, value) {
    sessionStorage.setItem(key, value);
  }

  showLoader() {
    this.spinnerService.show();
  }

  hideLoader() {
    this.spinnerService.hide();
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  showInfo(message) {
    this.toastr.info(message, 'Info!', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  showWarning(message) {
    this.toastr.warning(message, 'Warning !', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  showError(message) {
    this.toastr.error(message, 'Error!', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  showMsg(message) {
    this.toastr.warning(message, 'No Images', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  setValue(val) {
    this.requestInfo = val;
  }

  getValue() {
    return this.requestInfo;
  }

  // setReceipt(val) {

  // }

  formatDate<T>(val, formaTType) {
    return new Promise((resolve, reject) => {
      try {
        var selectedDate;
        if (val !== null && val.year) {
          selectedDate = val.year + "-" + val.month + "-" + val.day
        } else {
          selectedDate = val
        }
        if (moment(selectedDate, formaTType).isValid()) {
          resolve(selectedDate)
        } else {
          reject();
        }
      } catch (error) {
      }
    })
  }

  setBed(bed) {

    if (this.bedArray.length === 0) {
      this.bedArray.push(bed);
    } else {
      const existBed = this.bedArray.indexOf(bed);
      console.log('existBed ', existBed);
      if (existBed === -1) {
        this.bedArray.push(bed);
      } else {
        this.bedArray.splice(bed, 1);
      }
      // let bedArray = [];
      console.log('this.bedArray ', this.bedArray)
      // this.bedArray.forEach((element) => {

      //   if (element.bedid !== bed.bedid) {
      //     bedArray.push(bed);
      //   }
      // });
    }
  }

  setUploadDoc(doc) {
    console.log('setUploadDoc', doc)
    this.docData = doc;
  }

  getUploadDoc() {
    return this.docData;
  }

  setbookingConfirmation(resp) {
    this.bookingConfirmation = resp;
  }

  getbookingConfirmation() {
    return this.bookingConfirmation;
  }

  setBedArray(bed) {
    this.bedArray = bed;
    // if (this.bedArray.length === 0) {
    //   this.bedArray.push(bed);
    // } else {
    //   const existBed = this.bedArray.indexOf(bed);
    //   console.log('existBed ', existBed);
    //   if (existBed === -1) {
    //     this.bedArray.push(bed);
    //   } else {
    //     this.bedArray.splice(bed, 1);
    //   }
    // let bedArray = [];
    // console.log('this.bedArray ', this.bedArray)
    // this.bedArray.forEach((element) => {

    //   if (element.bedid !== bed.bedid) {
    //     bedArray.push(bed);
    //   }
    // });
    // }
  }

  getBeds() {
    console.log('this.bedArray ' + JSON.stringify(this.bedArray));
    return this.bedArray;
  }

  getSelectedBeds() {
    this.selectedBed = [];
    // console.log('this.bedArray ' + JSON.stringify(this.bedArray));
    for (const x of this.bedArray) {
      if (x.status === 'SLT') {
        for (const y of x.roomInfo) {
          if (y.status === 'SLT') {
            // let bed;
            // let price = 0;
            for (const z of y.bedInfo) {
              if (z.status === 'SLT') {
                // if (bed) {
                //   price = price + z.bedPrice;
                //   bed = bed + ',' + z.bedNo;
                // } else {
                //   bed = z.bedNo;
                //   price = z.bedPrice;
                // }
                const newObj = {
                  room: z.roomName,
                  bed: z.bedNo,
                  total: z.bedPrice,
                  rent: z.bedPrice,
                  bedid: z.bedid,
                  bedPriceOtherHp: z.bedPriceOtherHp,
                  bedPriceDiscount: z.bedPriceDiscount
                };
                this.selectedBed.push(newObj);
                // const exitingStatus = this.selectedBed.indexOf(newObj);
                // if (exitingStatus == -1) {
                //   this.selectedBed.push(newObj);
                // } else {
                //   this.selectedBed.pop(1, newObj);
                // }
              }
            }
          }
        }
      }
    }
    return this.selectedBed;
  }

  setBookingInfo(allInfo) {
    console.log('this.allInfo ', allInfo);
    this.bookingInfo = allInfo;
  }

  getBookingInfo() {
    console.log('tthis.bookingInfo ', this.bookingInfo);
    return this.bookingInfo;
  }

  formatTodayDate<T>(today) {
    return new Promise((resolve, reject) => {
      try {
        var selectedDate;
        let month;
        let day;
        if (today !== null) {
          if (Number(today.getMonth()) + 1 < 10) {
            month = '0' + (Number(today.getMonth()) + 1)
          } else {
            month = Number(today.getMonth()) + 1
          }
          if (today.getDate() < 10) {
            day = '0' + today.getDate()
          } else {
            day = today.getDate()
          }
          selectedDate = today.getFullYear() + '-' + month + '-' + day;
        }
        if (selectedDate) {
          resolve(selectedDate)
        } else {
          reject();
        }
      } catch (error) {
      }
    })
  }

  searchFromArray<T>(searchedArray, searchedKey, searchedValue) {
    return new Promise((resolve, reject) => {
      try {
        const response = searchedArray.find(val => val.searchedKey === searchedValue);
        if (response != null && response != undefined) {
          resolve(response)
        } else {
          reject();
        }
      } catch (error) {
      }
    })
  }

  loaderWithTimer() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
    }, 1000);
  }

  clearAllLocalStorage() {
    sessionStorage.clear();
  }

  getUserRole() {
    return this.userRoles;
  }

  setUserRole(roles) {
    this.userRoles = roles;
  }

  generateClassList(group) {
    this.classList = [];
    return new Promise((resolve, reject) => {
      try {
        for (let i = 0; i < 45; i++) {
          const classObj = {
            id: i + group,
            class: i + 1
          }
          this.classList.push(classObj)
        }
        if (this.classList.length == 45) {
          resolve(this.classList);
        }
      } catch (error) {
      }
    })
  }

  confirm(
    title: string,
    message: string,
    dialogSize): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: dialogSize, backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = 'OK';
    modalRef.componentInstance.btnCancelText = 'Cancel';
    return modalRef.result;
  }

  confirm2(
    title: string,
    message: string,
    btnOkText: string = 'Yes',
    btnCancelText: string = 'No',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialog2Component, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

  deleteFromArray(array, obj) {
    this.recArray = [];
    return new Promise((resolve, rejected) => {
      try {
        const index = array.indexOf(obj);
        if (index > -1) {
          array.splice(index, 1);
          resolve(array);
        }
      } catch (error) {

      }
    })
  }
}
