import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Domain } from '../domain/doamin';
import { Observable, map, of } from 'rxjs';
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
    this.router.navigate(['/auth/sigin']);
  }

  IsAuthenticated(): boolean {
    let todayTick =Math.floor((new Date).getTime() / 1000)
    console.log("todayTick",todayTick)
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      let token_exp_date= JSON.parse(atob( accessToken.split('.')[1])).exp
      console.log("token_exp_date",token_exp_date)
      if (todayTick < token_exp_date) {
        console.log("login")
        return true;
      }
    }
    console.log('token time expire');
    return false;
  }
}
