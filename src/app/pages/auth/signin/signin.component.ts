import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',

})
export class SigninComponent implements OnInit {
  ReportForm: FormGroup;
  TwoStepForm:FormGroup
  btnLoading:boolean=false
  IsActiveTwoStep:boolean=false
  counter_end:boolean=false
  countDown: Subscription;
  counter = 120;
  tick = 1000;
  constructor(private formBuilder: FormBuilder,private http:HttpService,private alertServices:AlertifyService,private router:Router,private authService:AuthenticationService){}
  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if(this.IsActiveTwoStep){
        --this.counter
      }
      if(this.counter==0)
        this.counter_end=true

    });
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
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    const val = this.ReportForm.value;
    this.authService.login(val.mobile_number).subscribe((response) => {
        console.log(response)
        this.btnLoading=false
        this.IsActiveTwoStep=true
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
        localStorage.setItem('token',response.access_token)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      )
    this.btnLoading=false
  }
  ResendPassword(){
    this.counter=120
    this.counter_end=false
    this.onSubmit()
  }

}
