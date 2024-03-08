import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import { IMissionRegisteration } from 'src/app/interfaces/IMissionRegisteration';
import { IMissionRegisterationForm } from 'src/app/interfaces/IMissionRegisterationForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-mission-registration-add',
  templateUrl: './mission-registration-add.component.html',
  styleUrl: './mission-registration-add.component.css'
})
export class MissionRegistrationAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  id: number = 0;
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot?.paramMap.get('id'));
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        employee_fk_id: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        destination:new FormControl('',[Validators.required])
      }
    )
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IMissionRegisterationForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      employee_fk_id: this.ReportForm.controls.employee_fk_id.value,
      end_date: this.ReportForm.controls.end_date.value,
      start_date: this.ReportForm.controls.start_date.value,
      destination:this.ReportForm.controls.destination.value
    }
    if (this.id > 0) {
      // this.http.patch(`${Domain.PatchPost}/${this.id}?topic=${this.postForm.controls.post_type.value}` , postFormValue, null).subscribe((response) => {
      //   console.log(response)
      // }
      //)
    }
    else {
      this.http.create(Domain.CreateMissionRegistration, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        if (response == 'Record has been Added') {
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
        }
      }
      )
    }
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
}
