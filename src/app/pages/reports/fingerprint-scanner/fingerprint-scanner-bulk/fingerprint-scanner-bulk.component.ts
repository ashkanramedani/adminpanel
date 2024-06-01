
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import * as moment from 'jalali-moment';
import { IFingerScannerForm } from 'src/app/interfaces/IFingerScannerForm';
import { IFingerScannerBulkForm } from 'src/app/interfaces/IFingerScannerBulkForm';

@Component({
  selector: 'app-fingerprint-scanner-bulk',
  templateUrl: './fingerprint-scanner-bulk.component.html',
})
export class FingerprintScannerBulkComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/finger_scanner'
  form_title:string=" ورود خروج کارکنان"
  AuditForm: IFingerScannerForm
  get_Singel_route: string = Domain.GetFingerScanner
  put_route: string = Domain.PutFingerScanner
  create_route: string = Domain.CreateFingerScanner
  //#endregion
  page_title: string = "ایجاد"
  isOpenTab:number=1
  OpenTab(value:number){
    this.isOpenTab=value
    //this.setValidation(value)
  }
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  fileName:string
  formData = new FormData();
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
      }
    )
  }

  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
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
      this.btnLoading = true
      this.http.create(`${Domain.CreateFingerScanner}/${this.ReportForm.controls.created_fk_by.value}`, this.formData, null).subscribe((response) => {
        console.log(response)
        if (response == 'File added') {
          this.alertServices.success("با موفقیت اضافه شد" );
          this.ReportForm.reset();
        }
      }
      )
      this.btnLoading = false
  }
  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }

}



