import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { Isignin } from 'src/app/interfaces/Isignin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink,],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  ReportForm: FormGroup;
  btnLoading:boolean=false

  constructor(private formBuilder: FormBuilder,private http:HttpService,private alertServices:AlertifyService,private router:Router,private authService:AuthenticationService){}
  ngOnInit(): void {
    this.ReportForm = this.formBuilder.group(
      {
        username: new FormControl('admin@ieltsdaily.ir', [Validators.required]),
        password: new FormControl('Aa123456@@')
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
    this.authService.login(val.username,val.password).subscribe((response) => {
        console.log(response)
        localStorage.setItem('token',response.access_token)
        console.log("User is logged in");
        this.router.navigate(['/']);
      }
      )
    this.btnLoading=false
  }

}
