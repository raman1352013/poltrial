import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  states() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/states';
        this.getCall(apiName).subscribe((data) => {
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


  districts(stateId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/districts/' + stateId;
        this.getCall(apiName).subscribe((data) => {
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

  genders() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/genders';
        this.getCall(apiName).subscribe((data) => {
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

  idProofs() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/id-proofs';
        this.getCall(apiName).subscribe((data) => {
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


  qualifications(usedFor) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/qualifications/' + usedFor;
        this.getCall(apiName).subscribe((data) => {
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

  boards(type) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/boards/' + type;
        this.getCall(apiName).subscribe((data) => {
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

  tehsils(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/tehsils/' + districtId;
        this.getCall(apiName).subscribe((data) => {
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

  blocks(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/blocks/' + districtId;
        this.getCall(apiName).subscribe((data) => {
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

  panchayats(blockId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/panchayats/' + blockId;
        this.getCall(apiName).subscribe((data) => {
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

  category(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/category/' + districtId;
        this.getCall(apiName).subscribe((data) => {
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

  subCategory(districtId, categoryId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/sub-category/' + districtId + '/' + categoryId;
        this.getCall(apiName).subscribe((data) => {
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

  subCategoryV2(districtId, categoryId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/sub-category/' + districtId + '/' + categoryId;
        this.getCall(apiName).subscribe((data) => {
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

  venue(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/venue/' + districtId;
        this.getCall(apiName).subscribe((data) => {
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

  examVenue(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/exam-venue/' + districtId;
        this.getCall(apiName).subscribe((data) => {
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
