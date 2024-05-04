import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'jalali-moment';
import { Domain } from 'src/app/domain/doamin';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { IEmployeeEntryExitBulkForm } from 'src/app/interfaces/IEmployeeEntryExitBulkForm';
import { IEmployeeEntryExitForm } from 'src/app/interfaces/IEmployeeEntryExitForm';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employee-entry-exit-bulk-add',
  templateUrl: './employee-entry-exit-bulk-add.component.html',
})
export class EmployeeEntryExitBulkAddComponent implements OnInit {
  ReportForm: FormGroup;
  fileName:string
  EmployiesData: IEmployees[] = []
  btnLoading:boolean=false
  page_title:string="افزودن"
  AuditForm:IEmployeeEntryExitForm
  formData = new FormData();
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {
  }
  ngOnInit(): void {
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
      }
    )
  }

  UploadImage(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.formData.append("file", file);
  }
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IEmployeeEntryExitBulkForm =
    {
      file: this.ReportForm.controls.file.value,
    }
      this.btnLoading=true
      this.http.create(`${Domain.CreateBulkEmployeeEntryExit}/${this.ReportForm.controls.created_fk_by.value}`, this.formData, null).subscribe((response) => {
        console.log(response)
        if (response == 'File added') {
          this.alertServices.success("با موفقیت اضافه شد" );
          this.ReportForm.reset();
          this.btnLoading=false
        }
      }
      )
  }
  GetEmployeeData() {
    this.http.getAll(Domain.GetAuditEmplooyies).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  
}
