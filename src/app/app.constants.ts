import { AbstractControl, ValidationErrors } from "@angular/forms";
import { SharedService } from "./services/shared/shared.service";

export const COMMONTEXT = {
  INCOMPLETE_FORM: 'Please complete the form',
};

export const APP_RELOAD = {
  TIMER: 18000000,
};

export const PAGINATION_PARAMETERS = {
  PAGE: 1,
  PAGE_SIZE: 3
}

export const PATTER_VALIDATION = {
  // ^([a-zA-Z ]){2,30}$
  NAME: '^[a-zA-Z]+(\s[a-zA-Z]+)?$',
  PHONE: '^[0-9]{1,25}$',
  EMAIL: '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
  DIGI10TPHONE: '[1-9]{1}[0-9]{9}',
  DIGI6PIN: '^[0-9]',
  ALPHA225: '[a-zA-Z0-9,-/ .]{1,225}$',
  ALPHA15: '[a-zA-Z0-9,-/ .]{1,15}$',
  ALPHA100: '[a-zA-Z0-9,-/ .]{1,100}$',
  FULLNAME: '[a-zA-Z][a-zA-Z ]*',
  DIGI12NO: '[1-9]{1}[0-9]{11}'
};

export class CustomValidators {
  static invalidCode(control: AbstractControl): ValidationErrors | null {
    return { invalidCode: true };
  }


  static emailValidation(control: AbstractControl): ValidationErrors | null {

    if (control.value) {
      var reg = new RegExp(PATTER_VALIDATION.EMAIL);

      if (!reg.test(control.value)) {
        return { invalidEmail: true }
      }
    }

  }

  static phoneNumberValidation(control: AbstractControl): ValidationErrors | null {

    if (control.value) {
      var reg = new RegExp(PATTER_VALIDATION.PHONE);

      if (!reg.test(control.value)) {
        return { invalidPhoneNumber: true }
      }
    }

  }

  static notGreaterthanTodaysDate(control: AbstractControl): ValidationErrors | null {

    let selectedDate;
    try {
      selectedDate = new Date(control.value.year, control.value.month, control.value.day, 0, 0, 0, 0);
    }
    catch (error) {
      selectedDate = new Date();
    }
    let current = new Date();
    let todaysDate = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate(), 0, 0, 0, 0);

    let timeDifference = todaysDate.getTime() - selectedDate.getTime();
    if (timeDifference < 0)
      return { invalidFutureDate: true };
  }

  static minimun21AgeValidation(control: AbstractControl): ValidationErrors | null {

    try {
      if (!(new Date(control.value.year + 21, control.value.month - 1, control.value.day) <= new Date()))
        return { invalidMinimum21Age: true };
    }
    catch (ex) {
      return null;
    }
  }

  static pastDateValidation(control: AbstractControl): ValidationErrors | null {

    let selectedDate;
    try {
      selectedDate = new Date(control.value.year, control.value.month, control.value.day, 0, 0, 0, 0);
    }
    catch (error) {
      selectedDate = new Date();
    }
    let current = new Date();
    let todaysDate = new Date(current.getFullYear(), current.getMonth() + 6, current.getDate(), 0, 0, 0, 0);

    let timeDifference = todaysDate.getTime() - selectedDate.getTime();
    if (timeDifference <= 0)
      return { invalidFutureDate: true };
  }

}
