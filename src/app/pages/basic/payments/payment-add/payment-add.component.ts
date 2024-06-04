import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { Ipayment_methodForm } from 'src/app/interfaces/Ipayment_methodForm';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
})
export class PaymentAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/payments'
  form_title:string="روش پرداخت"
  AuditForm: Ipayment_methodForm
  get_Singel_route: string = Domain.GetPaymentMethodData
  put_route: string = Domain.PutPaymentMethodData
  create_route: string = Domain.CreatePaymentMethodData
  //#endregion
  page_title: string = "ایجاد"
  EmployeName:string
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('',[Validators.required]),
        user_fk_id: new FormControl('',[Validators.required]),
        shaba: new FormControl<number |null>(null,[Validators.required,Validators.minLength(24),Validators.maxLength(24)]),
        card_number: new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16)])
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
    this.ReportForm.controls["user_fk_id"].patchValue(this.AuditForm.user_fk_id);
    this.ReportForm.controls["shaba"].patchValue(this.AuditForm.shaba);
    this.ReportForm.controls["card_number"].patchValue(this.AuditForm.card_number);
    this.GetEmployetitle(this.AuditForm.user_fk_id)
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: Ipayment_methodForm =
    {
      payment_method_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      user_fk_id: this.ReportForm.controls.user_fk_id.value,
      shaba: this.ReportForm.controls.shaba.value,
      card_number: this.ReportForm.controls.card_number.value,

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

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }

  GetEmployetitle(id:any){

    this.http.get(Domain.GetUsers,id).subscribe((response) => {
      this.EmployeName = response.name +' '+ response.last_name;
    })
  }
  GetEmployeName(value:any){

    this.http.get(Domain.GetUsers,value.target.value).subscribe((response) => {
      this.EmployeName = response.name +' '+ response.last_name;
    })
  }

}

