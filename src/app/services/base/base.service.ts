import { Response, RequestOptions, Http, } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class BaseService {
  apiURL = 'http://api.plos.org/search?q=title:DNA';
  token;
  constructor(
    public http: HttpClient,
  ) { }


  getRequestHeader(): HttpHeaders {
    const authToken = 'Default Token';
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Authorization', 'DefaultToken');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Token', '12123123dwsww1qws2dwd23');
    return headers;
  }


  getCall(apiUrl): Observable<HttpResponse<Object>> {
    this.token = sessionStorage.getItem('AccessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token || '',
        'X-Content-Type-Options': 'nosniff'
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<HttpResponse<Object>>(environment.baseUrl + apiUrl, httpOptions).pipe(map((observe: 'text') => {
      return observe;
    }));
  }

  getViewDoc(url) {
    return this.http.get(environment.baseUrl + url, {
      'responseType': 'blob',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('AccessToken') || ''
      })
    });
  }

  postViewDoc(url, body) {
    return this.http.post(environment.baseUrl + url, body, {
      'responseType': 'blob',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('AccessToken') || ''
      })
    });
  }

  // getPDF(apiUrl): Observable<Blob> {
  //   return this.http.get(environment.baseUrl + apiUrl, {
  //     responseType: 'blob',
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': '*',
  //       'Authorization': sessionStorage.getItem('AccessToken') || ''
  //     })
  //   });
  // }

  getBlobThumbnail(url): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<Blob>(url,
      {
        'url': 'http://acs/Logo.png'
      }, { headers: headers, responseType: 'blob' as 'json' });
  }

  postImageOrSoundCall(apiUrl) {
    return this.http.get(environment.baseUrl + apiUrl, {
      'responseType': 'arraybuffer', // 'text' as 'json',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('AccessToken') || ''
      })
    });
  }

  getPDF(apiUrl): Observable<Blob> {
    return this.http.get(environment.baseUrl + apiUrl, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('AccessToken') || ''
      })
    });
  }

  




  postCall(apiUrl, body): Observable<HttpResponse<Object>> {
    this.token = sessionStorage.getItem('AccessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token || '',
        'X-Content-Type-Options': 'nosniff'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post<HttpResponse<Object>>(environment.baseUrl + apiUrl, body, httpOptions).pipe(map((observe: 'response') => {
      return observe;
    }));
  }

  postImageCall(apiUrl, body, files): Observable<HttpResponse<Object>> {
    this.token = sessionStorage.getItem('AccessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token || ''
      }),
      observe: 'response' as 'response'
    };
    const formData: FormData = new FormData();
    const blob = new Blob([files], { type: 'multipart/form-data' });
    this.token = sessionStorage.getItem('AccessToken');
    formData.append('file', blob, body.file);
    // formData.append('applicationNumber', body.applicationNo);
    return this.http.post(environment.baseUrl + apiUrl, formData, httpOptions).pipe(map((observe: 'response') => {
      return observe;
    }));

  }

  getImageDoc(imageUrl: string): Observable<Blob> {
    return this.http.get(environment.baseUrl + imageUrl, {
      'responseType': 'blob', headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('AccessToken') || ''
      })
    });
  }


  postDocument(apiUrl, body, file): Observable<HttpResponse<Object>> {
    this.token = sessionStorage.getItem('AccessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token || ''
      }),
      observe: 'response' as 'response'
    };
    const formData: FormData = new FormData();
    this.token = sessionStorage.getItem('AccessToken');

    if (file instanceof Array) {
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]); // blob, body.file);
      }
    } else {
      formData.append('file', file); // blob, body.file);
    }

    formData.append('applicationNumber', body.applicationNumber);
    return this.http.post(environment.baseUrl + apiUrl, formData, httpOptions).pipe(map((observe: 'response') => {
      return observe;
    }));

  }


  deleteCall(apiUrl, body): Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(apiUrl, body).pipe(map((observe: HttpResponse<any>) => {
      return observe;
    }));
  }

  public putCall<T>(apiUrl: string, body: Object): Observable<HttpResponse<Object>> {
    this.token = sessionStorage.getItem('AccessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token || ''
      }),
      observe: 'response' as 'response'
    };
    return this.http.put<HttpResponse<Object>>(apiUrl, body).pipe(map((observe: HttpResponse<any>) => {
      return observe;
    }));
  }

  postCallUploadFiles(apiUrl, body): Observable<HttpResponse<any>> {
    // if (this.checkNetworkConnection()) {
    const httpOptions = {
      headers: new HttpHeaders({
        // "Accept": "*/*",
        'Access-Control-Allow-Origin': '*',
        Authorization: sessionStorage.getItem('AccessToken')
      }),
      observe: 'response' as 'response'
    };
    return this.http.post<HttpResponse<any>>(environment.baseUrl + apiUrl, body, httpOptions).pipe(map((observe: HttpResponse<any>) => {
      return observe;
    }));
    // } else {
    //   return new Observable<HttpResponse<any>>();
    // }
  }

  // postCallUploadFiles(apiUrl, body): Observable<HttpResponse<any>> {
  //   // if (this.checkNetworkConnection()) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         // "Accept": "*/*",
  //         'Access-Control-Allow-Origin': '*',
  //         Authorization:  sessionStorage.getItem('Token')
  //       }),
  //       observe: 'response' as 'response'
  //     };
  //     return this.http.post<HttpResponse<any>>(environment.baseUrl + apiUrl, body, httpOptions).pipe(map((observe: HttpResponse<any>) => {
  //       return observe;
  //     }));
  //   // } else {
  //   //   return new Observable<HttpResponse<any>>();
  //   // }
  // }


}
