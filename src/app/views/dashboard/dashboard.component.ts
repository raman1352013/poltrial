import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { JsService } from '../../services/js/js.service';
import { ChangeDetectorRef } from '@angular/core';
import { ReportsService } from '../../services/reports/reports.service';
import { SharedService } from '../../services/shared/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnChanges, OnInit {
  @ViewChild('form') form: ElementRef;

  summary;
  summaryList = [];
  selectedToday;

  minDate = "1993-10-31"
  maxDate = "2003-10-31"
  enableForm = false;
  constructor(
    private router: Router,
    private jsService: JsService,
    private cdref: ChangeDetectorRef,
    private reportsService: ReportsService,
    private sharedService: SharedService
  ) {
  }

  ngOnChanges() {
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {

    this.sharedService.setValue(null);
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp.id == 2) {
        this.sharedService.getLocalStorageItem('district').then((res: any) => {
          if (res) {
            const reqObj = {
              districtId: res.id
            }
            this.candidateSummary(reqObj);
          }
        })
      } else {
        const reqObj = {
          districtId: ''
        }
        this.candidateSummary(reqObj);
      }
    })

    this.checkRole();
  }

  checkRole() {
    this.sharedService.getLocalStorageItem('userType').then((resp: any) => {
      if (resp) {
        if (resp.id !== 3 && resp.id !== 2) {
          this.sharedService.confirm('Alert', 'You are not allowed to access this module', 'md').then((res: any) => {
            this.router.navigateByUrl('/Login');
          });
          // this.sharedService.showWarning();
        }
      }
    });
  }

  candidateSummary(reqObj) {
    this.reportsService.candidateSummary(reqObj).then((resp: any) => {
      if (resp.status == 200) {
        if (resp['body']['responseCode'] == 200) {
          this.summary = resp['body']['responseObject'].summary;
          this.summaryList = resp['body']['responseObject'].summaryList;
          console.log('Resp ', resp['body']['responseObject'])
        }
      }
    })
  }

  gotToDetailsBy(value, applicationInfo) {
    const reqObj = {
      value: value,
      applicationInfo: applicationInfo
    }
    this.sharedService.setValue(reqObj);
    this.router.navigateByUrl('/ApplicationDetails');
    console.log('gotToDetailsBy ', value + ' applicationInfo ', applicationInfo.districtId)
  }

}
