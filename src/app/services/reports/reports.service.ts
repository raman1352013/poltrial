import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
  candidateSummary(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/candidate-summary';
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

  candidateDetails(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/candidate-details';
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

  petSummary(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/pet-summary';
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

  scrutinySummary(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/scrutiny-summary';
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

  scrutinyReports(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/scrutiny-reports';
        this.postViewDoc(apiName, reqObj).subscribe((data) => {
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

  pstPetIndividualReports() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/pst-pet-individual-reports';
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

  scrutinyIndividualReports() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/reports/scrutiny-individual-reports';
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


  downloadReports(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        // {
        const apiName = '/api/reports/download-reports';
        this.postViewDoc(apiName, reqObj).subscribe((data) => {
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
