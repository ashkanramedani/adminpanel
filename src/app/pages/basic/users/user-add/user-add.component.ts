import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import * as moment from 'jalali-moment';
import { IUsers } from 'src/app/interfaces/IUsers';
import { IUsersForm } from 'src/app/interfaces/IUsersForm';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IUserFormRoles } from 'src/app/interfaces/IUserFormRoles';
import { IuserEditForm } from 'src/app/interfaces/IuserEditForm';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/users'
  form_title:string="پرسنل"
  AuditForm: IUsersForm
  EditForm:IuserEditForm
  get_Singel_route: string = Domain.GetUsers
  put_route: string = Domain.PutUsers
  create_route: string = Domain.CreateUsers
  //#endregion
  page_title: string = "ایجاد"
  ReportForm: FormGroup;
  isOpenSearchRole: boolean = false
  RolesData: IRoles[] = []
  RolesInputArray: IUserFormRoles[]=[]
  RolesInputTitleArray: {role_id:string,role_title:string}[]=[]
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetRolesData()
    this.ReportForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        day_of_birth: new FormControl('',[Validators.required]),
        email: new FormControl('',),
        mobile_number: new FormControl('', [Validators.required]),
        address: new FormControl(''),
        fingerprint_scanner_user_id: new FormControl('', [Validators.required]),
        roles: new FormControl('',)
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
      .get(this.get_Singel_route, this.id)
      .subscribe((response) => {
        console.log(response)
        this.EditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["name"].patchValue(this.EditForm.name);
    this.ReportForm.controls["last_name"].patchValue(this.EditForm.last_name);
    if(this.EditForm.day_of_birth!=null){ 
    this.ReportForm.controls["day_of_birth"].patchValue(moment(this.EditForm.day_of_birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
    }
    this.ReportForm.controls["email"].patchValue(this.EditForm.email);
    this.ReportForm.controls["mobile_number"].patchValue(this.EditForm.mobile_number);
    this.ReportForm.controls["address"].patchValue(this.EditForm.address)
    this.ReportForm.controls["fingerprint_scanner_user_id"].patchValue(this.EditForm.fingerprint_scanner_user_id)
    this.EditForm.roles.forEach((item, index) => {
      this.RolesInputTitleArray.push( {role_id:item.role_pk_id,role_title:item.name})
    })
    this.EditForm.roles.forEach((item, index) => {
      this.RolesInputArray.push({old_id:'',  new_id:item.role_pk_id})
    })
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    let ReportFormValue: IUsersForm =
    {
      user_pk_id: this.id,
      name: this.ReportForm.controls.name.value,
      last_name: this.ReportForm.controls.last_name.value,
      day_of_birth: moment.from(this.ReportForm.controls.day_of_birth.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),
      email: this.ReportForm.controls.email.value,
      mobile_number: this.ReportForm.controls.mobile_number.value,
      address: this.ReportForm.controls.address.value,
      fingerprint_scanner_user_id: this.ReportForm.controls.fingerprint_scanner_user_id.value,
       roles: this.RolesInputArray.length <= 0 ? new Array({old_id:'',  new_id:''}) : this.RolesInputArray,
      //roles:this.RolesInputArray,
    }
    if (this.id != null) {
      this.btnLoading = true
      this.http.put(this.put_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت ویرایش شد");
        this.btnLoading = false
      }
      )
    }
    else {
      this.btnLoading = true
      this.http.create(this.create_route, ReportFormValue, null).subscribe((response) => {
        console.log(response)
        this.alertServices.success("با موفقیت اضافه شد");
        this.ReportForm.reset();
        this.btnLoading = false
      }
      )
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
      let newRole={old_id:'',  new_id:id}
      this.RolesInputArray.push(newRole);
      this.RolesInputTitleArray. push( {role_id:id,role_title:name})
    }
  }
  RemoveRoleInput(index: number,id:string) {
    this.RolesInputArray.splice(index, 1);
    this.RolesInputArray.push({old_id:id, new_id:''})
    this.RolesInputTitleArray.splice(index, 1);
    console.log(this.RolesInputArray)
  }
}

