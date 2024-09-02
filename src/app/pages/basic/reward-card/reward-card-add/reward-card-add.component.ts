import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IUserFormRoles } from 'src/app/interfaces/IUserFormRoles';
import { IRewardCardInsert, IRewardCardUpdata } from 'src/app/interfaces/IRewardCard';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-reward-card-add',
  templateUrl: './reward-card-add.component.html',
})
export class RewardCardAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/reward-card'
  form_title: string = "کارت پاداش اساتید"
  AuditForm: IRewardCardInsert
  EditForm: IRewardCardUpdata
  get_Singel_route: string = Domain.GetRewardCardData
  put_route: string = Domain.PutRewardCardData
  create_route: string = Domain.CreateRewardCardData
  rewardType: string="percentage"
  //#endregion
  IsShowenModal: boolean = false
  page_title: string = "ایجاد"
  ReportForm: FormGroup;
  updateForm: FormGroup
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: IUserFormRoles[] = []
  RolesInputTitleArray: { role_id: string, role_title: string }[] = []
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService, private router: Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        reward_amount: new FormControl('', [Validators.required] ),
        reward_type: new FormControl('percentage', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        user_fk_id: new FormControl('', [Validators.required]),
      }
    )
    this.updateForm = this.formBuilder.group({
      created_fk_by: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      reward_amount: new FormControl('', [Validators.required]),
      reward_type: new FormControl('percentage', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
    })
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
        this.EditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.updateForm.controls["created_fk_by"].patchValue(this.EditForm.created_fk_by);
    this.updateForm.controls["description"].patchValue(this.EditForm.description);
    this.updateForm.controls["reward_amount"].patchValue(this.EditForm.reward_amount);
    this.updateForm.controls["reward_type"].patchValue(this.EditForm.reward_type);
    this.updateForm.controls["start_date"].patchValue(moment(this.EditForm.start_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    this.updateForm.controls["end_date"].patchValue(moment(this.EditForm.end_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
    this.EditForm.reward_type=='fix' ? (this.rewardType='fix'):(this.rewardType='percentage')
  }
  onSubmit() {
    this.btnLoading = true
    if (this.id != null) {

      if (this.updateForm.invalid) {
        this.updateForm.markAllAsTouched();
        return;
      }
      let updateFormValue: IRewardCardUpdata =
      {
        created_fk_by: this.updateForm.controls.created_fk_by.value,
        description: this.updateForm.controls.description.value,
        reward_amount: this.rewardType=='fix' ? (this.updateForm.controls.reward_amount.value.replace(/,/g, '')):(this.updateForm.controls.reward_amount.value)  ,
        reward_type: this.updateForm.controls.reward_type.value,
        start_date: moment.from(this.updateForm.controls.start_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        end_date: moment.from(this.updateForm.controls.end_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        reward_card_pk_id: this.id,

      }
      this.http.put(this.put_route, updateFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.router.navigate([this.cancle_link])
      }
      )
      this.btnLoading = false
    }
    else {
      if (this.ReportForm.invalid) {
        this.ReportForm.markAllAsTouched();
        this.alertServices.error("مقادیر اجباری را وارد نمایید")
        return;
      }
      let ReportFormValue: IRewardCardInsert =
      {
        created_fk_by: this.ReportForm.controls.created_fk_by.value,
        description: this.ReportForm.controls.description.value,
        reward_amount: this.rewardType=='fix' ? (this.ReportForm.controls.reward_amount.value.replace(/,/g, '')):(this.ReportForm.controls.reward_amount.value)  ,
        reward_type: this.ReportForm.controls.reward_type.value,
        start_date: moment.from(this.ReportForm.controls.start_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        end_date: moment.from(this.ReportForm.controls.end_date.value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
        user_fk_id: this.ReportForm.controls.user_fk_id.value

      }
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
      }
      )
      this.btnLoading = false
    }
  }

  GetRolesData() {
    this.http.getAll(`${Domain.GetRolesData}?page=1&limit=1000&order=desc`).subscribe((response) => {
      this.RolesData = response;
    })
  }

  OpenSearchRole() {
    this.isOpenSearchRole = !this.isOpenSearchRole;
  }
  AddRoleInput(id: string, name: string) {
    if (id != '') {
      let newRole = { old_id: '', new_id: id }
      this.RolesInputArray.push(newRole);
      this.RolesInputTitleArray.push({ role_id: id, role_title: name })
    }
  }
  RemoveRoleInput(index: number, id: string) {
    this.RolesInputArray.splice(index, 1);
    this.RolesInputArray.push({ old_id: id, new_id: '' })
    this.RolesInputTitleArray.splice(index, 1);
    console.log(this.RolesInputArray)
  }
  CloseModal() {
    this.GetRolesData()
    this.IsShowenModal = false
  }
  OpenModal() {
    this.IsShowenModal = true
  }
  changeType(event: any) {
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
}

