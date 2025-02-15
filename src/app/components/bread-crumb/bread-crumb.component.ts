import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, ActivationEnd } from "@angular/router";
import { filter, map, buffer, pluck } from 'rxjs/operators';
import { Location } from '@angular/common';
interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}
@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {
  // public breadcrumbs: IBreadcrumb[];
  // bcLoadedData;
  // bcForDisplay;
  route: string;
  breadcrumbList: Array<any>;
  routeLinks: number;
  count: number;
  breadCrumb = [];
  constructor(private location: Location, private router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== "") {
        this.route = location.path();
        this.breadcrumbList = this.route.split('/');
        if (this.breadcrumbList !== undefined && this.breadcrumbList.length > 0) {
          this.breadcrumbList.forEach((val) => {
            if (val !== "" && val !== "Home") {
              if (this.breadCrumb.includes(val) === false) {
                this.breadCrumb.push(val);
              }
            }
            // console.log("this.breadCrumb "  + JSON.stringify(this.breadCrumb));
            this.count = this.breadcrumbList.length;
          })
        }
      }
    });
  }

  ngOnInit() {

  }

  breadCrumbNav(breadLink, error: Response | any) {
    // console.log('breadLink : ' + JSON.stringify(breadLink))
    if (breadLink !== 'Home') {
      this.router.navigateByUrl('/Home/' + breadLink).catch(e => {
        //If specified path is not found
      })
    } else if (breadLink === 'Home') {
      this.router.navigateByUrl('/Home').catch(e => {
        //If home is not found
      })
    } else {
      setTimeout(() => this.router.navigateByUrl('/Home'));
      return error.status;
    }
  }

}


