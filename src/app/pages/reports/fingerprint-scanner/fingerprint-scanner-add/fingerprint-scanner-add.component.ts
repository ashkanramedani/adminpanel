import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import  moment from 'jalali-moment';
import { IFingerScannerAdd, IFingerScannerUpdate } from 'src/app/interfaces/IFingerScannerForm';

@Component({
  selector: 'app-fingerprint-scanner-add',
  templateUrl: './fingerprint-scanner-add.component.html'
})
export class FingerprintScannerAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/finger_scanner'
  form_title:string=" ورود خروج کارکنان"
  AuditForm: IFingerScannerAdd
  updateForm:FormGroup
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
    this.updateForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
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
    this.http.getAll(`${Domain.GetDropDowUser}?order=desc&SortKey=name&employee=true`).subscribe((response) => {
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
    this.updateForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.updateForm.controls["description"].patchValue(this.AuditForm.description);
    //this.ReportForm.controls["Date"].patchValue( moment(this.AuditForm.Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.updateForm.controls["Enter"].patchValue( this.AuditForm.Enter);
    this.updateForm.controls["Exit"].patchValue(this.AuditForm.Exit);
  }
  onSubmit() {
    this.btnLoading = true
    if(this.id==null)
    {
      if (this.ReportForm.invalid) {
        this.ReportForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      this.btnLoading = true
    let ReportFormValue: IFingerScannerAdd =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      user_fk_id: this.ReportForm.controls.user_fk_id.value,
      Date:moment.from(this.ReportForm.controls.Date.value, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      Enter:this.ReportForm.controls.Enter.value,
      Exit:this.ReportForm.controls.Exit.value,

    }
    this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
      console.log(response)
      this.alertServices.success("با موفقیت اضافه شد");
      this.ReportForm.reset();
    }
    )
    }
    else{
      if (this.updateForm.invalid) {
        this.updateForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      let updateFormValue: IFingerScannerUpdate =
    {
      created_fk_by: this.updateForm.controls.created_fk_by.value,
      description: this.updateForm.controls.description.value,
      Enter:this.updateForm.controls.Enter.value,
      Exit:this.updateForm.controls.Exit.value,
      fingerprint_scanner_pk_id:this.id

    }
      this.http.put(this.put_route, updateFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
    }
    this.btnLoading = false
  }


}



