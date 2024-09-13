
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IDiscountInsert, IDiscountUpdate } from 'src/app/interfaces/IDiscount';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
})
export class DiscountAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/discount'
  form_title: string = "کد تخفیف"
  AuditForm: IDiscountInsert
  get_Singel_route: string = Domain.GetDiscount
  put_route: string = Domain.PutDiscount
  create_route: string = Domain.CreateDiscount
  //#endregion
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
        discount_type: new FormControl('', [Validators.required]),
        discount_amount: new FormControl('', [Validators.required]),
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
    // this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    // this.ReportForm.controls["last_name"].patchValue(this.AuditForm.last_name);
    // if(this.AuditForm.day_of_birth!=null){
    //   this.ReportForm.controls["day_of_birth"].patchValue(moment(this.AuditForm.day_of_birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    //   }
    // this.ReportForm.controls["email"].patchValue(this.AuditForm.email);
    // this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    // this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    // this.ReportForm.controls["address"].patchValue(this.AuditForm.address);
    // this.ReportForm.controls["level"].patchValue(this.AuditForm.level);
    // this.ReportForm.controls["id_card_number"].patchValue(this.AuditForm.id_card_number);
    // this.ReportForm.controls["user_pk_id"].patchValue(this.id);
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id == null) {
      if (this.InsertForm.invalid) {
        this.InsertForm.markAllAsTouched();
        return;
      }
      let InsertFormValue: IDiscountInsert =
      {
        created_fk_by: this.InsertForm.controls.created_fk_by.value,
        description: this.InsertForm.controls.description.value,
        discount_type: this.InsertForm.controls.discount_type.value,
        discount_amount: this.InsertForm.controls.discount_amount.value,
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

