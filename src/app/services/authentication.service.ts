import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Domain } from '../domain/doamin';
import { Observable, map, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpService, private router: Router) {}
  getToken() {
    let headers;
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      headers = {
        Authorization: `Bearer ${JSON.parse(accessToken).access_token}`,
      };
    }
    return headers;
  }
  login(username: string,password:string): Observable<any> {
    return this.http.create(Domain.SingIn, {
      username: username,
      password:password
    });
  }

  // twoStepSubmit(mobile: string, code: string): Observable<any> {
  //   return this.http.create(Domain.validateCode, {
  //     mobile: mobile,
  //     code: code,
  //   });
  // }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  IsAuthenticated(): boolean {
    let todayTick = Date.now() * 10000 + 621355968000000000;
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      if (todayTick < JSON.parse(accessToken).exp_date) {
        return true;
      }
    }
    //console.log('token time expire');
    return false;
  }
}
