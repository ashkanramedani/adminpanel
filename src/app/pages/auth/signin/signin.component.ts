import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { IOTP } from 'src/app/interfaces/IOTP';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',

})
export class SigninComponent implements OnInit {
  ReportForm: FormGroup;
  TwoStepForm: FormGroup
  SignUpForm: FormGroup
  SignInWithPasswordForm: FormGroup
  btnLoading: boolean = false

  IsSigninStep: boolean = true
  IsTwoStep: boolean = false
  IsSignupStep: boolean = false
  IsSigningWithPassword: boolean = false

  counter_end: boolean = false
  countDown: Subscription;
  counter = 120;
  tick = 1000;
  emial_entrered: string
  constructor(private formBuilder: FormBuilder, private http: HttpService, private alertServices: AlertifyService, private router: Router, private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.IsTwoStep) {
        --this.counter
      }
      if (this.counter == 0)
        this.counter_end = true

    });
    this.SignInWithPasswordForm = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
    this.ReportForm = this.formBuilder.group(
      {
        mobile_number: new FormControl('', [Validators.required]),
      }
    )
    this.TwoStepForm = this.formBuilder.group(
      {
        code: new FormControl('', [Validators.required]),
      }
    )
    this.SignUpForm = this.formBuilder.group(
      {
        fname: new FormControl('', [Validators.required]),
        lname: new FormControl('', [Validators.required]),
        mobile_number: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl(''),
      }
    )
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    const val = this.ReportForm.value;
    this.authService.login(val.mobile_number).subscribe((response: IOTP) => {
      console.log(response)
      this.btnLoading = false
      if (response.otp_send_successful) {
        if (response.has_account) {
          this.btnLoading = false
          this.IsSigninStep = false
          this.IsTwoStep = true
        }
        else {
          this.SignUpForm.controls["mobile_number"].patchValue(val.mobile_number);
          this.btnLoading = false
          this.IsSigninStep = false
          this.IsTwoStep = false
          this.IsSignupStep = true
        }
      }
      else {
        this.alertServices.error("متاسفانه خطایی رخ داده است")
        this.btnLoading = false
      }

    }
    )
  }
  TwoStepSubmit() {
    if (this.TwoStepForm.invalid) {
      this.TwoStepForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    const val = this.TwoStepForm.value;
    this.authService.VerifyOTP(val.code).subscribe((response) => {
      console.log(response)
      this.btnLoading = false
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user_pk_id', response.user_pk_id)
      console.log("User is logged in");
      this.router.navigate(['/']);
    }
    )
    this.btnLoading = false
  }
  SignupSubmit() {
    if (this.SignUpForm.invalid) {
      this.TwoStepForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    const val = this.SignUpForm.value;
    this.authService.SignUp(val).subscribe((response) => {
      console.log(response)
      this.btnLoading = false
      if (response.access_token != null) {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('user_pk_id', response.user_pk_id)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      else {
        this.alertServices.error("متاسفانه خطایی رخ داده است")
        this.btnLoading = false
      }
    }
    )
  }
  SubmitWithPassword(){
    if (this.SignInWithPasswordForm.invalid) {
      this.SignInWithPasswordForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    const val = this.SignInWithPasswordForm.value;
    this.authService.loginWithPassword(val.username,val.password).subscribe((response) => {
      console.log(response)
      this.btnLoading = false
      if (response.access_token != null) {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('user_pk_id', response.user_pk_id)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      else {
        this.alertServices.error("متاسفانه خطایی رخ داده است")
        this.btnLoading = false
      }
    }
    )
  }

  ResendPassword() {
    this.counter = 120
    this.counter_end = false
    this.onSubmit()
  }
  SignInWithPassword(){
    this.IsSigninStep = false
    this.IsTwoStep = false
    this.IsSignupStep = false
    this.IsSigningWithPassword = true
  }
  SignInWithCode(){
    this.IsSigninStep = false
    this.IsTwoStep = true
    this.IsSignupStep = false
    this.IsSigningWithPassword = false
  }
}
