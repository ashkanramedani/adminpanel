
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IDiscountInsert, IDiscountUpdate } from 'src/app/interfaces/IDiscount';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
})
export class DiscountAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/discount'
  form_title: string = "کد تخفیف"
  AuditForm: IDiscountUpdate
  get_Singel_route: string = Domain.GetDiscount
  put_route: string = Domain.PutDiscount
  create_route: string = Domain.CreateDiscount
  //#endregion
  rewardType: string = "percentage"
  page_title: string = "ایجاد"
  RoleClusterData: string[] = []
  UpdateForm: FormGroup;
  InsertForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: string[] = []
  RolesInputTitleArray: string[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.GetEmployeeData()
    this.id = this.route.snapshot?.paramMap.get('id');
    this.InsertForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        discount_type: new FormControl('percentage', [Validators.required]),
        discount_amount: new FormControl('', [Validators.required]),
        target_user_fk_id: new FormControl(''),
        target_product_fk_id: new FormControl(''),
        start_date: new FormControl(''),
        end_date: new FormControl('')
      }
    )
    this.UpdateForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      }
    )
    if (this.id != null) {
      this.page_title = 'ویرایش';
      this.get_single_Data();
    }
  }

  changeType(event: any) {
    this.InsertForm.controls['discount_amount'].setValue('')
    let type = event.target.value
    if (type == 'percentage') {
      this.rewardType = 'percentage'
    }
    else if (type == 'fix') {
      this.rewardType = 'fix'
    }
    else
      alert("متاسفانه خطایی زخ داده است")
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
    this.UpdateForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.UpdateForm.controls["description"].patchValue(this.AuditForm.description);
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id == null) {
      if ((this.rewardType == 'percentage') && ((this.InsertForm.controls['discount_amount'].value > 100) || (this.InsertForm.controls['discount_amount'].value < 0))) {
        this.alertServices.error('مقادیر  را به صورت صحیح وارد نمایید')
        this.btnLoading = false
        return;
      }
      if (this.InsertForm.invalid) {
        this.InsertForm.markAllAsTouched();
        this.alertServices.error('مقادیر اجباری را وارد نمایید')
        return;
      }
      let InsertFormValue: IDiscountInsert =
      {
        created_fk_by: this.InsertForm.controls.created_fk_by.value,
        description: this.InsertForm.controls.description.value,
        discount_type: this.InsertForm.controls.discount_type.value,
        start_date: moment.from(this.InsertForm.controls.start_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        end_date: moment.from(this.InsertForm.controls.end_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        //target_product_fk_id:this.InsertForm.controls.target_product_fk_id.value,
        target_product_fk_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        target_user_fk_id: this.InsertForm.controls.target_user_fk_id.value,
        discount_amount: this.rewardType == 'fix' ? Number(this.InsertForm.controls.discount_amount.value.replace(/,/g, '')) : Number(this.InsertForm.controls.discount_amount.value),
      }
      this.http.create(this.create_route, InsertFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.InsertForm.reset();
      }
      )
      this.btnLoading = false
    }
    else {
      if (this.UpdateForm.invalid) {
        this.UpdateForm.markAllAsTouched();
        this.alertServices.error('مقادیر اجباری را وارد نمایید')
        return;
      }
      let UpdateFormValue: IDiscountUpdate =
      {
        created_fk_by: this.UpdateForm.controls.created_fk_by.value,
        description: this.UpdateForm.controls.description.value,
        discount_code_pk_id: this.id
      }
      this.http.put(this.put_route, UpdateFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
      this.btnLoading = false
    }
    this.btnLoading = false
  }
}

