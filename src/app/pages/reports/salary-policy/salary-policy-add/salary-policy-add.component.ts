import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { ISalaryPolicyForms } from 'src/app/interfaces/ISalaryPolicyForms';
import { SalaryTypeEnum } from 'src/app/enum/SalaryTypeEnum';

@Component({
  selector: 'app-salary-policy-add',
  templateUrl: './salary-policy-add.component.html',
})
export class SalaryPolicyAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/reports/salarypolicy'
  form_title:string="ضریب محاسبه حقوق"
  AuditForm: ISalaryPolicyForms
  get_Singel_route: string = Domain.GetSalaryPolicyData
  put_route: string = Domain.PutSalaryPolicyData
  create_route: string = Domain.CreateSalaryPolicyData
  //#endregion
  page_title: string = "ایجاد"
  salary_type_enum=SalaryTypeEnum
  Salary_Type:SalaryTypeEnum
  OpenTab(value:SalaryTypeEnum){
    this.Salary_Type=value
  }
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.Salary_Type=SalaryTypeEnum.Fixed
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        user_fk_id: new FormControl('', [Validators.required]),
        day_starting_time: new FormControl('10:22:44'),
        day_ending_time: new FormControl('10:22:44'),
        Regular_hours_factor: new FormControl('',[Validators.required]),
        Regular_hours_cap: new FormControl(),
        overtime_permission: new FormControl<boolean>(true,[Validators.required]),
        overtime_factor: new FormControl('',[Validators.required]),
        overtime_cap: new FormControl('',[Validators.required]),
        Base_salary: new FormControl('',[Validators.required]),
        overtime_threshold: new FormControl('',[Validators.required]),
        undertime_factor: new FormControl('',[Validators.required]),
        undertime_threshold: new FormControl('',[Validators.required]),
        off_day_permission: new FormControl<boolean>(true,[Validators.required]),
        off_day_factor: new FormControl('',[Validators.required]),
        off_day_cap: new FormControl('',[Validators.required]),
        remote_permission: new FormControl<boolean>(true,[Validators.required]),
        remote_factor: new FormControl('',[Validators.required]),
        remote_cap: new FormControl('',[Validators.required]),
        medical_leave_factor: new FormControl('',[Validators.required]),
        medical_leave_cap: new FormControl('',[Validators.required]),
        vacation_leave_factor: new FormControl('',[Validators.required]),
        vacation_leave_cap: new FormControl('',[Validators.required]),
        business_trip_permission: new FormControl<boolean>(true,[Validators.required]),
        business_trip_factor: new FormControl('',[Validators.required]),
        business_trip_cap: new FormControl('',[Validators.required]),
        Fix_pay:new FormControl<number>(0,[Validators.required])
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
    this.ReportForm.controls["created_fk_by"].patchValue(this.AuditForm.created_fk_by);
    this.ReportForm.controls["user_fk_id"].patchValue(this.AuditForm.user_fk_id);
    this.ReportForm.controls["Base_salary"].patchValue(this.AuditForm.Base_salary);
    this.ReportForm.controls["day_starting_time"].patchValue(this.AuditForm.day_starting_time);
    this.ReportForm.controls["day_ending_time"].patchValue(this.AuditForm.day_ending_time);
    this.ReportForm.controls["Regular_hours_factor"].patchValue(this.AuditForm.Regular_hours_factor);
    this.ReportForm.controls["Regular_hours_cap"].patchValue(this.AuditForm.Regular_hours_cap);
    this.ReportForm.controls["overtime_permission"].patchValue(this.AuditForm.overtime_permission);
    this.ReportForm.controls["overtime_factor"].patchValue(this.AuditForm.overtime_factor);
    this.ReportForm.controls["overtime_cap"].patchValue(this.AuditForm.overtime_cap);
    this.ReportForm.controls["overtime_threshold"].patchValue(this.AuditForm.overtime_threshold);
    this.ReportForm.controls["undertime_factor"].patchValue(this.AuditForm.undertime_factor);
    this.ReportForm.controls["undertime_threshold"].patchValue(this.AuditForm.undertime_threshold);
    this.ReportForm.controls["off_day_permission"].patchValue(this.AuditForm.off_day_permission);
    this.ReportForm.controls["off_day_factor"].patchValue(this.AuditForm.off_day_factor);
    this.ReportForm.controls["off_day_cap"].patchValue(this.AuditForm.off_day_cap);
    this.ReportForm.controls["remote_permission"].patchValue(this.AuditForm.remote_permission);
    this.ReportForm.controls["remote_factor"].patchValue(this.AuditForm.remote_factor);
    this.ReportForm.controls["remote_cap"].patchValue(this.AuditForm.remote_cap);
    this.ReportForm.controls["medical_leave_factor"].patchValue(this.AuditForm.medical_leave_factor);
    this.ReportForm.controls["medical_leave_cap"].patchValue(this.AuditForm.medical_leave_cap);
    this.ReportForm.controls["vacation_leave_factor"].patchValue(this.AuditForm.vacation_leave_factor);
    this.ReportForm.controls["vacation_leave_cap"].patchValue(this.AuditForm.vacation_leave_cap);
    this.ReportForm.controls["business_trip_permission"].patchValue(this.AuditForm.business_trip_permission);
    this.ReportForm.controls["business_trip_factor"].patchValue(this.AuditForm.business_trip_factor);
    this.ReportForm.controls["business_trip_cap"].patchValue(this.AuditForm.business_trip_cap);
     this.ReportForm.controls["Fix_pay"].patchValue(this.AuditForm.Fix_pay);
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: ISalaryPolicyForms =
    {
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      Base_salary:this.ReportForm.controls.Base_salary.value.includes(',') ?(this.ReportForm.controls.Base_salary.value.replace(/,/g, "")):(this.ReportForm.controls.Base_salary.value)  ,
      user_fk_id: this.ReportForm.controls.user_fk_id.value,
      day_starting_time: this.ReportForm.controls.day_starting_time.value,
      day_ending_time: this.ReportForm.controls.day_ending_time.value,
      Regular_hours_factor: this.ReportForm.controls.Regular_hours_factor.value,
      Regular_hours_cap: this.ReportForm.controls.Regular_hours_cap.value,
      overtime_permission: this.ReportForm.controls.overtime_permission.value,
      overtime_factor: this.ReportForm.controls.overtime_factor.value,
      overtime_cap: this.ReportForm.controls.overtime_cap.value,
      overtime_threshold: this.ReportForm.controls.overtime_threshold.value,
      undertime_factor: this.ReportForm.controls.undertime_factor.value,
      undertime_threshold: this.ReportForm.controls.undertime_threshold.value,
      off_day_permission: this.ReportForm.controls.off_day_permission.value,
      off_day_factor: this.ReportForm.controls.off_day_factor.value,
      off_day_cap: this.ReportForm.controls.off_day_cap.value,
      remote_permission: this.ReportForm.controls.remote_permission.value,
      remote_factor: this.ReportForm.controls.remote_factor.value,
      remote_cap: this.ReportForm.controls.remote_cap.value,
      medical_leave_factor: this.ReportForm.controls.medical_leave_factor.value,
      medical_leave_cap: this.ReportForm.controls.medical_leave_cap.value,
      vacation_leave_factor: this.ReportForm.controls.vacation_leave_factor.value,
      vacation_leave_cap: this.ReportForm.controls.vacation_leave_cap.value,
      business_trip_permission: this.ReportForm.controls.business_trip_permission.value,
      business_trip_factor: this.ReportForm.controls.business_trip_factor.value,
      business_trip_cap: this.ReportForm.controls.business_trip_cap.value,
      Fix_pay:this.ReportForm.controls.Fix_pay.value.includes(',')  ? (this.ReportForm.controls.Fix_pay.value.replace(/,/g, "")):(this.ReportForm.controls.Fix_pay.value) ,
      salary_policy_pk_id: this.id,
      Salary_Type:this.Salary_Type
    }

    if (this.id != null) {
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
        this.router.navigate([this.cancle_link])
      }
      )
    }
    else {
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.btnLoading = false
        this.ReportForm.reset();
      }
      )
    }
    this.btnLoading = false
  }



}

