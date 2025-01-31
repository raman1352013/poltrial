import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  saveDirectApplication(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/save-direct-application';
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

  saveApplication(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/save-application';
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

  uploadImage(formData) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/upload-image';
        this.postCallUploadFiles(apiName, formData).subscribe((data) => {
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

  uploadImageId(formData) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/upload-image-id';
        this.postCallUploadFiles(apiName, formData).subscribe((data) => {
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

  getImage(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/user/get-image/action/' + reqObj;
        this.getImageDoc(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getImageV2(type, applicationId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-image/docType/' + type + '/applicationId/' + applicationId;
        this.getImageDoc(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  payFee() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/pay-fee/1';
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplicationStatus() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application-status/1';
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  post(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/post';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplication() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/v2/get-application/1';
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  saveDraftApplication(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/save-draft-application';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplicationN() {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application/1';
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  admitCardSummary(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/admit-card-summary/' + reqParam;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  admitCardSummaryExam(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/exam-admit-card-summary/' + reqParam;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  generateAdmitCard(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/generate-admit-card';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateExamAdmitCard(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/generate-exam-admit-card';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint}/api/application/generate-scrutiny-admit-card
  generateScrutinyAdmitCard(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/generate-scrutiny-admit-card';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }



  getPetCandidateCount(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-pet-candidate-count';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getExamCandidateCount(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-exam-candidate-count';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplicationSubmitted(reqParam, section) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application-submitted/' + reqParam + '/' + section;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplicationSubmittedV2(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application-byNo/' + reqParam;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  updatePet(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/update-pet';
        this.postCall(apiName, reqParam).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint/api/application/update-scrutiny
  updateScrutiny(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/update-scrutiny';
        this.postCall(apiName, reqParam).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  candidatesPetScheduled(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/candidates-pet-scheduled';
        this.postCall(apiName, reqParam).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  removeCandidatePet(reqParam) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/remove-candidate-pet';
        this.postCall(apiName, reqParam).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  linkApplications(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/link-applications/' + reqObj.pApplicationNo + '/' + reqObj.cApplicationNo;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  candidatesDuplicate(applicationNo) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/candidates-duplicate/' + applicationNo;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  petResult(applicationNo) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/pet-result/' + applicationNo;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint}/api/application/get-application-scrutiny/{rollNo}/{action}
  getApplicationScrutiny(rollNo, action) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application-scrutiny/' + rollNo + '/' +action;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getApplicationExam(rollNo) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-application-exam/' + rollNo;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

 
  pstPetReports(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/pst-pet-reports';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // api/application/update - application
  updateApplication(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/update-application';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disqualifyApplicantWrittenExam(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/disqualify-applicant-written-exam';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  

  updateExam(reqObj) {
    // {EndPoint/api/application/update-exam
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/update-exam';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint}/api/application/candidates-exam-scheduled
  candidatesExamScheduled(reqObj) { 
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/candidates-exam-scheduled';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // candidates-scrutiny-scheduled

  candidatesScrutinyScheduled(reqObj) { 
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/candidates-scrutiny-scheduled';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint/api/master/scrutiny-venue/{districtId}

  // scrutinyVenue() {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const apiName = '/api/application/candidates-exam-scheduled';
  //       this.getCall(apiName).subscribe((data) => {
  //         if (data !== null && data !== undefined) {
  //           resolve(data);
  //         } else {
  //           reject();
  //         }
  //       }, (error) => {
  //         // console.log("ERROR STATUS", error);
  //         reject(error);
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  // {EndPoint}/api/application/documentation-admit-card-summary/{districtId}
  documentationAdmitCardSummary(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/documentation-admit-card-summary/' +districtId;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint/api/master/scrutiny-venue/{districtId}
  scrutinyVenue(districtId) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/master/scrutiny-venue/' +districtId;
        this.getCall(apiName).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // {EndPoint}/api/application/get-scrutiny-candidate-count
  getScrutinyCandidateCount(reqObj) {
    return new Promise((resolve, reject) => {
      try {
        const apiName = '/api/application/get-scrutiny-candidate-count';
        this.postCall(apiName, reqObj).subscribe((data) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject();
          }
        }, (error) => {
          // console.log("ERROR STATUS", error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


}
