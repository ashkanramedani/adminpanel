import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IClassCancellationForm } from 'src/app/interfaces/IClassCancellationForm';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { ITeacherDelayForm } from 'src/app/interfaces/ITeacherDelayForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teachers-delay-add',
  templateUrl: './teachers-delay-add.component.html',
  styleUrl: './teachers-delay-add.component.css'
})
export class TeachersDelayAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  ClassData: IClassDetails[] = []
  id: number = 0;
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot?.paramMap.get('id'));
    this.GetEmployeeData()
    this.GetClassData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        class_fk_id: new FormControl('', [Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        delay: new FormControl('', [Validators.required]),
      }
    )
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ITeacherDelayForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      class_fk_id: this.ReportForm.controls.class_fk_id.value,
      teacher_fk_id: this.ReportForm.controls.teacher_fk_id.value,
      delay: this.ReportForm.controls.delay.value,
    }
    if (this.id > 0) {
      // this.http.patch(`${Domain.PatchPost}/${this.id}?topic=${this.postForm.controls.post_type.value}` , postFormValue, null).subscribe((response) => {
      //   console.log(response)
      // }
      //)
    }
    else {
      this.http.create(Domain.CreateTeachersDelay, ReportFormValue, null).subscribe((response) => {
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
  GetClassData() {
    this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
}