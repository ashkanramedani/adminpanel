import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Domain } from '../domain/doamin';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { IsignUpForm } from '../interfaces/IsignUpForm';

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
  login(MobileNumber: string,): Observable<any> {
    return this.http.create(`${Domain.Auth.OTP}?mobile_number=${MobileNumber}` );
  }
  loginWithPassword(username: string,password:string): Observable<any> {
    return this.http.create(`${Domain.Auth.SingIn}`,{username:username,password:password} );
  }
  VerifyOTP(code: string,): Observable<any> {
    return this.http.create(`${Domain.Auth.VerifyOTP}?code=${code}` );
  }
  SignUp(data: IsignUpForm,): Observable<any> {
    return this.http.put(`${Domain.Auth.SingUp}`,data,null );
  }
  // twoStepSubmit(mobile: string, code: string): Observable<any> {
  //   return this.http.create(Domain.validateCode, {
  //     mobile: mobile,
  //     code: code,
  //   });
  // }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }

  IsAuthenticated(): boolean {
    let todayTick =Math.floor((new Date).getTime() / 1000)
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      let token_exp_date= JSON.parse(atob( accessToken.split('.')[1])).exp
      if (todayTick < token_exp_date) {
        console.log("login")
        return true;
      }
    }
    console.log('token time expire');
    return false;
  }
}
