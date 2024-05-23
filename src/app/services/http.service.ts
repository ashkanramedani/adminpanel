import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AlertifyService } from './alertify.service';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,public alertServices: AlertifyService) { }
  getToken()
  {
    let headers;
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      headers = {
        Authorization: `Bearer ${JSON.parse(accessToken).access_token}`,
      };
    }
    return headers;
  }

  getAll(url:string,headers?:any ):Observable<any>
  {
    return this.http.get<any>(url,{headers}).pipe(
  
      catchError(this.errorHandler)
    );
  }
  get(url:string ,id: any,headers?:any): Observable<any> {
    return this.http.get<any>(`${url}/${id}`,{headers}).pipe(
      catchError(this.errorHandler));
  }

  create(url:string, data?: any,headers?:any): Observable<any> {
    return this.http.post<any>(url, data,{headers:headers},).pipe(
      catchError(this.errorHandler));
  }
  patch(url:string, data?: any,headers?:any): Observable<any> {
    return this.http.patch<any>(url, data,{headers:headers},).pipe(
      catchError(this.errorHandler));
  }

  put (url:string, data?: any,headers?:any): Observable<any> {
    return this.http.put<any>(url, data,{headers:headers},).pipe(
      catchError(this.errorHandler));
  }

  delete(url:string, id?: any,headers?:any): Observable<any> {
    return this.http.delete(`${url}/${id}`,{headers}).pipe(
      catchError(this.errorHandler));;
  }
  deleteWithQuery(url:string, id?: any,headers?:any): Observable<any> {
    return this.http.delete(`${url}`,{headers}).pipe(
      catchError(this.errorHandler));;
  }

  deleteWithBody(url:string, data?: any,headers?:any): Observable<any> {
    return this.http.delete<any>(url,{body:data,headers:headers}).pipe(
      catchError(this.errorHandler));
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(`Error Code: ${error.status}\nMessage: ${error.message}`)
   alertify.alert(`متاسفانه خطایی رخ داده است( کد خطا: ${error.status})`,JSON.stringify(error.error.detail), function(){ }).set('label', 'بستن'); ;
    return throwError(errorMessage);
 }
}
