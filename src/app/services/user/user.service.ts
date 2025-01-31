import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  login(loginObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/user/login';
        this.postCall(apiName, loginObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log('ERROR STATUS', error.status);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  registerUser(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/user/register-user';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log('ERROR STATUS', error.status);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  resetPasswordWithOtp(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/user/reset-password-with-otp';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log('ERROR STATUS', error.status);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  changePassword(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/user/change-password';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log('ERROR STATUS', error.status);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
