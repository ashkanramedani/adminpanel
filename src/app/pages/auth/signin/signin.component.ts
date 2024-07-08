import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { Isignin } from 'src/app/interfaces/Isignin';
import { AlertifyService } from 'src/app/services/alertify.service';
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

  constructor(private formBuilder: FormBuilder,private http:HttpService,private alertServices:AlertifyService,private router:Router){}
  ngOnInit(): void {
    this.ReportForm = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('')
      }
    )
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: Isignin =
    {
      username: this.ReportForm.controls.username.value,
      password: this.ReportForm.controls.password.value,
    }
      this.http.create(Domain.SingIn, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.router.navigate(['']);
        this.ReportForm.reset();
      }
      )
    this.btnLoading=false
  }

}
