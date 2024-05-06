import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IEmployees } from 'src/app/interfaces/IEmployees';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { Ipayment_method } from 'src/app/interfaces/Ipayment_method';
import { Ipayment_methodForm } from 'src/app/interfaces/Ipayment_methodForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-payment-method-add',
  templateUrl: './payment-method-add.component.html',
  styleUrl: './payment-method-add.component.css'
})
export class PaymentMethodAddComponent implements OnInit {
  ReportForm: FormGroup;
  id: any;
  EmployiesData: IEmployees[] = []
  page_title: string = "افزودن"
  btnLoading: boolean = false
  AuditForm: Ipayment_methodForm
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        status: new FormControl('',[Validators.required]),
        employee_fk_id: new FormControl('',[Validators.required]),
        shaba: new FormControl(''),
        card_number: new FormControl('')
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }
  get_single_Data() {
    //TODO
    this.http
      .get(Domain.GetPaymentMethodData, this.id)
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
    this.ReportForm.controls["employee_fk_id"].patchValue(this.AuditForm.employee_fk_id);
    this.ReportForm.controls["shaba"].patchValue(this.AuditForm.shaba);
    this.ReportForm.controls["card_number"].patchValue(this.AuditForm.card_number);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: Ipayment_methodForm =
    {
      payment_method_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      status: this.ReportForm.controls.status.value,
      employee_fk_id: this.ReportForm.controls.employee_fk_id.value,
      shaba: this.ReportForm.controls.shaba.value,
      card_number: this.ReportForm.controls.card_number.value,

    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(Domain.PutPaymentMethodData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(Domain.CreatePaymentMethodData, ReportFormValue, null).subscribe((response) => {
        console.log(response)
          this.alertServices.success("با موفقیت اضافه شد");
          this.ReportForm.reset();
          this.btnLoading = false
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

