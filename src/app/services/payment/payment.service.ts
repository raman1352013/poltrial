import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  pgRequest(reqAmount) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/payment/pg-request/' + reqAmount;
        this.getCall(apiName).subscribe((data) => {
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

  // http://localhost:3571/hpprc/api/payment/get-billing-data/1286835
  getBillingData(reqId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/payment/get-billing-data/' + reqId;
        this.getCall(apiName).subscribe((data) => {
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

  updatePgId(txnId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/payment/update-pg-id/' + txnId + '/' + 11;
        this.getCall(apiName).subscribe((data) => {
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
