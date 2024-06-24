import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import * as moment from 'jalali-moment';
import { IFingerScannerForm } from 'src/app/interfaces/IFingerScannerForm';

@Component({
  selector: 'app-fingerprint-scanner-add',
  templateUrl: './fingerprint-scanner-add.component.html'
})
export class FingerprintScannerAddComponent implements OnInit {
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
  ClassData: IClassDetails[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        user_fk_id: new FormControl('', [Validators.required]),
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
    this.http.getAll(`${Domain.GetUsers}?page=1&limit=1000&order=desc`).subscribe((response) => {
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
    this.ReportForm.controls["user_fk_id"].patchValue(this.AuditForm.user_fk_id);
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
      user_fk_id: this.ReportForm.controls.user_fk_id.value,
      Date:moment.from(this.ReportForm.controls.Date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      Enter:this.ReportForm.controls.Enter.value,
      Exit:this.ReportForm.controls.Exit.value,
      fingerprint_scanner_pk_id:this.id

    }
    if (this.id != null) {
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
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


}



