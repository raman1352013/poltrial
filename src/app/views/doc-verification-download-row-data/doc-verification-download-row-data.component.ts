import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master/master.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../services/shared/shared.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReportsService } from '../../services/reports/reports.service';


@Component({
  selector: 'app-doc-verification-download-row-data',
  templateUrl: './doc-verification-download-row-data.component.html',
  styleUrls: ['./doc-verification-download-row-data.component.css']
})
export class DocVerificationDownloadRowDataComponent implements OnInit {
  searchForm: FormGroup;
  districtList = [];
  disableDistrict = false;
  categoryList = [];
  subCategoryList = [];
  constructor(
    private masterService: MasterService,
    private sharedService: SharedService,
    private router: Router,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.district();
    this.initializeForm();
    this.checkRole();
    // this.getCategory();
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id == 2) {
          this.sharedService.getLocalStorageItem('district').then((district: any) => {
            if (district) {
              console.log('district ', district.id)
              this.searchForm.controls['districtId'].setValue(district.id);
              this.disableDistrict = true;
            }
          });
        } else {
          this.disableDistrict = false;
        }
      }
    })
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 3 && resp.id !== 2 && resp.id !== 14) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
          // this.sharedService.showWarning();
        }
      }
    });
  }
  
  // getSelectedDistrict() {

  // }

  getCategory() {
    const districtId = this.searchForm.controls['districtId'].value
    if (districtId) {
      this.masterService.category(districtId).then((resp: any) => {
        if (resp.status === 200) {
          if (resp['body']['responseCode'] === 200) {
            this.categoryList = resp['body']['responseObject'];
            console.log('this.districtList ', this.districtList)
          }
        }
      });
    } else {
      this.sharedService.showWarning('Please select district')
    }
  }

  getSubCategory(event) {
    const districtId = this.searchForm.controls['districtId'].value

    this.masterService.subCategory(districtId, event.target.value).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.subCategoryList = resp['body']['responseObject'];
          console.log('this.districtList ', this.districtList)
          

        }
      }
    });
  }

  district() {
    this.masterService.districts(9).then((resp: any) => {
      if (resp.status === 200) {
        if (resp['body']['responseCode'] === 200) {
          this.districtList = resp['body']['responseObject'];
          console.log('this.districtList ', this.districtList)
          if (this.disableDistrict == true) {
            this.sharedService.getLocalStorageItem('district').then((district: any) => {
              if (district) {
                console.log('district ', district.id)
                this.searchForm.controls['districtId'].setValue(district.id);
              }
            })
          }

        }
      }
    });
  }

  initializeForm() {
    this.searchForm = new FormGroup({
      petDate: new FormControl(''),
      districtId: new FormControl(''),
      category:  new FormControl(''),
      subCategory: new FormControl(''),
    });

    if (this.disableDistrict == true) {
      this.sharedService.getLocalStorageItem('district').then((district: any) => {
        if (district) {
          console.log('district ', district.id)
          this.searchForm.controls['districtId'].setValue(district.id);
        }
      })
    }
  }

  downloadReport() { 
    const reqObj = {
      action:2,
      districtId: this.searchForm.controls['districtId'].value,
      categoryId: null,
      subCategoryId: null
    }
    this.reportsService.scrutinyReports(reqObj).then((resp: any) => {
      if (resp) {
        // const downloadURL = window.URL.createObjectURL(resp);
        // const link = document.createElement('a');
        // link.href = downloadURL;
        // link.download = "Application Form.pdf";
        // link.click(); 
        const blob = new Blob([resp], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    })
  }


}
