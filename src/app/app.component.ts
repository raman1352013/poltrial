import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, AfterViewInit, Compiler } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APP_RELOAD } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'E-TMR';
  showHead = false; // MAINPAGE_PARAMETERS.showHead;
  showFooter = false;
  private loggedIn = false;
  private _compiler: Compiler;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        sharedService.showLoader();
        this.showFooter = false;
      }

      const session = sessionStorage.getItem('AccessToken')
      if (session == null || session == undefined || session == '') {
        // console.log('session ', session)
        // this.sharedService.confirm('Session Expired', 'Please Relogin')
        // router.navigateByUrl('/Login')
        // window.alert(session);
      }

      //   .then((resp: any) => {
      //   console.log('resp ', resp)
      //   if (resp == undefined) {
      //     router.navigateByUrl('/Login')
      //   }

      // })
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        sharedService.hideLoader();

        // tslint:disable-next-line:max-line-length
        if (event['url'] === '/Login' || event['urlAfterRedirects'] === '/Login') {
          this.showHead = false;
        } else if (event['url'] === '/' || event['url'] === undefined || event['url'] == null) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }

        this.showFooter = true;
      }
    });

    // document.addEventListener('contextmenu', function (e) {
    //   e.preventDefault();
    // });

    const bd = document.getElementsByTagName('body')[0];
    let time = new Date().getTime();

    bd.onmousemove = goLoad;
    function goLoad() {
      if (new Date().getTime() - time >= APP_RELOAD.TIMER) {
        time = new Date().getTime();
        console.log('1');

        // window.location.reload();
        // _compiler.clearCache();
        // sharedService.clearAllLocalStorage();
        router.navigateByUrl('/Login')
      } else {
        console.log('2');
        time = new Date().getTime();
      }
    }

    // router.events.subscribe( (event: Event) => {
    //   if (event instanceof NavigationStart) {
    //       // Show loading indicator
    //   }

    //   if (event instanceof NavigationEnd) {
    //       // Hide loading indicator
    //   }

    // });
    localStorage.setItem('loggedIn', 'false');
    window.localStorage.breakpoints = [];
  }

  ngOnInit() {
    window.localStorage.breakpoints = [];
    const session = sessionStorage.getItem('AccessToken')
    console.log('session ' , session)
    if (session == null || session == undefined || session == '') {
      // console.log('session ', session)
      // this.sharedService.confirm('Session Expired', 'Please Relogin')
      this.router.navigateByUrl('/Login')
      // window.alert(session);
    }
    // setTimeout(this.tryy,5000);
  }

  ngAfterViewChecked() {
    // this.commonService.showHead.subscribe(value => {
    //   this.showHead = (value == true);
    //   this.cdRef.detectChanges();
    //   this.showFooter=true;
    // });
  }





}
