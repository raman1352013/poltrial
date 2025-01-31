import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Route, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errorArray = [];
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private injector: Injector
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sharedService.showLoader();
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {

        if (event instanceof HttpResponse) {
          this.sharedService.hideLoader();
        }
      }, error => {
        this.sharedService.hideLoader();
        // this.sharedService.showError(JSON.stringify(error.status))
        // console.error('NICE ERROR' + JSON.stringify(error))
        if (error.status == 500) {
          // this.sharedService.confirm('Sidd', 'message')
          this.sharedService.showError('Something went wrong. Please try re-login')
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          console.log('Error ' , error.error)
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // console.log('errorArray', this.errorArray)
        console.log('Error Occured')
        this.router.navigateByUrl('/Login')

        // window.alert(errorMessage);
        // this.sharedService.confirm('Session Expired', 'Please Relogin')
        return throwError(errorMessage);
      })
    )
  }

}