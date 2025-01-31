import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  applicationPdf() {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/application-pdf';
        this.getPDF(apiName).subscribe((data) => {
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

  applicationPdfV2(applicationId) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/application-pdf/' + applicationId;
        this.getPDF(apiName).subscribe((data) => {
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

  admitCardPdf(applicationId) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/admit-card-pdf/' + applicationId;
        this.getPDF(apiName).subscribe((data) => {
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

  examAdmitCardPdf(applicationId) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/exam-admit-card-pdf/' + applicationId;
        this.getPDF(apiName).subscribe((data) => {
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

  // scrutiny-admit-card-pdf
  scrutinyAdmitCardPdf(applicationId) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/scrutiny-admit-card-pdf/' + applicationId;
        this.getPDF(apiName).subscribe((data) => {
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



  chestNumberPdf(applicationId) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/chest-number-pdf/' + applicationId;
        this.getPDF(apiName).subscribe((data) => {
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

  attendancePdf(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/attendance-pdf/' + reqObj.district + '/rollNoFrom/'+ reqObj.rollNoFrom + '/rollNoTo/' + reqObj.rollNoTo;
        this.getPDF(apiName).subscribe((data) => {
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

  writtenExamResult(reqString) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/written-exam-result/' +reqString;
        this.getPDF(apiName).subscribe((data) => {
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

  writtenExamResultV2(reqString) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/js/v2/written-exam-result/' +reqString;
        this.getPDF(apiName).subscribe((data) => {
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
