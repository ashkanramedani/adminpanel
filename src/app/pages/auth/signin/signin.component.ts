import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { phoneNumberValidator } from '@persian-tools/persian-tools';
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
  btnLoadingSignIn: boolean = false
  btnLoadingTwostep: boolean = false
  btnLoadingSigninPassword: boolean = false
  btnLoadingSignUp: boolean = false

  IsSigninStep: boolean = true
  IsTwoStep: boolean = false
  IsSignupStep: boolean = false
  IsSigningWithPassword: boolean = false

  counter_end: boolean = false
  countDown: Subscription;
  counter = 120;
  tick = 1000;
  emial_entrered: string
  IOtpResponse: IOTP
  constructor(private formBuilder: FormBuilder, private http: HttpService, private alertServices: AlertifyService, private router: Router, private authService: AuthenticationService) { }
  ngOnInit(): void {
    if (this.authService.IsAuthenticated())
      this.router.navigateByUrl("/");
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
    this.btnLoadingSignIn = true
    const val = this.ReportForm.value;
    if (phoneNumberValidator(val.mobile_number)) {
      this.authService.login(val.mobile_number).subscribe((response: IOTP) => {
        console.log(response)
        this.IOtpResponse = response
        this.btnLoadingSignIn = false
        if (response.otp_send_successful) {
          this.btnLoadingSignIn = false
          this.IsSigninStep = false
          this.IsTwoStep = true
        }
      })
    }
    else if ((new RegExp(/^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/i)).test(val.mobile_number)) {
      this.btnLoadingSignIn = false
      this.SignInWithPassword()
    }
    else {
      this.alertServices.error("لطفا شماره همراه یا آدرس ایمیل صحیح وارد نمایید.")
      this.btnLoadingSignIn = false
    }
  }
  TwoStepSubmit() {
    if (this.TwoStepForm.invalid) {
      this.TwoStepForm.markAllAsTouched();
      return;
    }
    this.btnLoadingTwostep = true
    const val = this.TwoStepForm.value;
    this.authService.VerifyOTP(val.code).subscribe((response) => {
      console.log(response)
      this.btnLoadingTwostep = false
      if (this.IOtpResponse.has_account && response != null) {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('user_pk_id', response.user_pk_id)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      else {
        this.SignUpForm.controls["mobile_number"].patchValue(this.ReportForm.controls["mobile_number"].value);
        this.IsSigninStep = false
        this.IsTwoStep = false
        this.IsSignupStep = true
        this.IsSigningWithPassword = false
      }
    }
    )
    this.btnLoadingTwostep = false
  }
  SignupSubmit() {
    if (this.SignUpForm.invalid) {
      this.TwoStepForm.markAllAsTouched();
      return;
    }
    this.btnLoadingSignUp = true
    const val = this.SignUpForm.value;
    this.authService.SignUp(val).subscribe((response) => {
      console.log(response)
      this.btnLoadingSignUp = false
      if (response.access_token != null) {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('user_pk_id', response.user_pk_id)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      else {
        this.alertServices.error("متاسفانه خطایی رخ داده است")
        this.btnLoadingSignUp = false
      }
    }
    )
  }
  SubmitWithPassword() {
    if (this.SignInWithPasswordForm.invalid) {
      this.SignInWithPasswordForm.markAllAsTouched();
      return;
    }
    this.btnLoadingSigninPassword = true
    const val = this.SignInWithPasswordForm.value;
    this.authService.loginWithPassword(val.username, val.password).subscribe((response) => {
      console.log(response)

      if (response.access_token != null) {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('user_pk_id', response.user_pk_id)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      else {
        this.alertServices.error("متاسفانه خطایی رخ داده است")
        this.btnLoadingSigninPassword = false
      }
    }
    )
    this.btnLoadingSigninPassword = false
  }

  ResendPassword() {
    this.counter = 120
    this.counter_end = false
    this.onSubmit()
  }
  SignInWithPassword() {
    this.SignInWithPasswordForm.controls["username"].patchValue(this.ReportForm.controls["mobile_number"].value);
    this.IsSigninStep = false
    this.IsTwoStep = false
    this.IsSignupStep = false
    this.IsSigningWithPassword = true
  }
  SignInWithCode() {
    this.IsSigninStep = true
    this.IsTwoStep = false
    this.IsSignupStep = false
    this.IsSigningWithPassword = false
  }
  ComingBack() {
    this.ReportForm.reset()
    this.SignUpForm.reset()
    this.TwoStepForm.reset()
    this.SignInWithPasswordForm.reset()
    this.IsSigninStep = true
    this.IsTwoStep = false
    this.IsSignupStep = false
    this.IsSigningWithPassword = false
  }
  CheckOtpInput(event: any) {
    if (event.target.value.length == 5)
      this.TwoStepSubmit()
  }
}
