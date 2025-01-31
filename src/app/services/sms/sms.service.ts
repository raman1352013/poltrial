import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SmsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
  sendSms(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/sms/send-sms';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          console.log('ERROR STATUS', error.status);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
