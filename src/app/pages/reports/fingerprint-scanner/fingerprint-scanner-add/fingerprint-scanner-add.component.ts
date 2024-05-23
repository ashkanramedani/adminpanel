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
import { IRemoteRequest } from 'src/app/interfaces/IRemoteRequest';
import { IRemoteRequestForm } from 'src/app/interfaces/IRemoteRequestForm';
import { IFingerScannerForm } from 'src/app/interfaces/IFingerScannerForm';

@Component({
  selector: 'app-fingerprint-scanner-add', 
  templateUrl: './fingerprint-scanner-add.component.html'
})
export class FingerprintScannerAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/finger_scanner'
  form_title:string=" ورود خرج کارکنان"
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
  ClassData: IClassDetails[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetClassData()
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        EnNo: new FormControl('', [Validators.required]),
        Name: new FormControl('', [Validators.required]),
        Date: new FormControl('', [Validators.required]),
        Enter: new FormControl('', [Validators.required]),
        Exit: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  GetEmployeeData() {
    this.http.getAll(Domain.GetUsers).subscribe((response) => {
      this.EmployiesData = response;
      console.log(response)
    })
  }
  get_single_Data() {
    //TODO
    this.http
      .get(this.get_Singel_route, this.id)
      .subscribe((response) => {
        console.log(response)
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["description"].patchValue(this.AuditForm.description);
    this.ReportForm.controls["status"].patchValue(this.AuditForm.status);
    this.ReportForm.controls["EnNo"].patchValue(this.AuditForm.EnNo);
    this.ReportForm.controls["Name"].patchValue(this.AuditForm.Name);
    this.ReportForm.controls["Date"].patchValue( moment(this.AuditForm.Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.ReportForm.controls["Enter"].patchValue( this.AuditForm.Enter);
    this.ReportForm.controls["Exit"].patchValue(this.AuditForm.Exit);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: IFingerScannerForm =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      EnNo: this.ReportForm.controls.EnNo.value,
      Name: this.ReportForm.controls.Name.value,
      Date:moment.from(this.ReportForm.controls.Date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      Enter:this.ReportForm.controls.Enter.value,
      Exit:this.ReportForm.controls.Exit.value,
      fingerprint_scanner_pk_id:this.id

    }
    if (this.id != null) { 
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد"); 
      }
      )
    }
    else { 
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset(); 
      }
      )
    }
    this.btnLoading = false
  }

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }
  GetClassData() {
    this.http.getAll(Domain.GetAuditClass).subscribe((response) => {
      this.ClassData = response;
      console.log(response)
    })
  }

}



