import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master/master.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../services/shared/shared.service';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReportsService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-pst-fail',
  templateUrl: './pst-fail.component.html',
  styleUrls: ['./pst-fail.component.css']
})
export class PstFailComponent implements OnInit {

  searchForm: FormGroup;
  districtList = [];
  disableDistrict = false;
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
      districtId: new FormControl('')
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
      action: 2,
      petDate: this.searchForm.controls['petDate'].value,
      districtId: this.searchForm.controls['districtId'].value
    }
    this.reportsService.downloadReports(reqObj).then((resp: any) => {
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
