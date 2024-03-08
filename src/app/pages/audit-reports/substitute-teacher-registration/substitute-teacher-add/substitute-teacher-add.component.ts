
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IRemoteRequestForm } from 'src/app/interfaces/IRemoteRequestForm';
import { ISubstituteTeacherForm } from 'src/app/interfaces/ISubstituteTeacherForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-substitute-teacher-add',
  templateUrl: './substitute-teacher-add.component.html',
  styleUrl: './substitute-teacher-add.component.css'
})
export class SubstituteTeacherAddComponent implements OnInit {
  ReportForm: FormGroup;
  EmployiesData: IEmployees[] = []
  ClassData:IClassDetails[]=[]
  id: number = 0;
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot?.paramMap.get('id'));
    this.GetEmployeeData();
    this.GetClassData();
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status:new FormControl(Boolean,[Validators.required]),
        teacher_fk_id: new FormControl('', [Validators.required]),
        replacement_teacher_fk_id:  new FormControl('', [Validators.required]),
        class_fk_id:new FormControl('', [Validators.required]),
      }
    )
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: ISubstituteTeacherForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status:this.ReportForm.controls.status.value,
      teacher_fk_id:this.ReportForm.controls.teacher_fk_id.value,
      replacement_teacher_fk_id: this.ReportForm.controls.replacement_teacher_fk_id.value,
      class_fk_id:this.ReportForm.controls.class_fk_id.value,
    }
    if (this.id > 0) {
      // this.http.patch(`${Domain.PatchPost}/${this.id}?topic=${this.postForm.controls.post_type.value}` , postFormValue, null).subscribe((response) => {
      //   console.log(response)
      // }
      //)
    }
    else {
      this.http.create(Domain.CreateSubstituteTeacher, ReportFormValue, null).subscribe((response) => {
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
  GetClassData()
  {
 this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }
}
