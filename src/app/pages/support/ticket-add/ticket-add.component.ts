import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IStudentsForm } from 'src/app/interfaces/IStudentsForm';
import  moment from 'jalali-moment';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
})
export class TicketAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/students'
  form_title:string="دانشجو"
  AuditForm: IStudentsForm
  get_Singel_route: string = Domain.GetStudentData
  put_route: string = Domain.PutStudentData
  create_route: string = Domain.CreateStudentData
  public editor:any = ClassicEditor;
  //#endregion
  page_title: string = "ایجاد"
  RoleClusterData:string[]=[]
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
    this.ReportForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        day_of_birth: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        mobile_number: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        id_card_number:new FormControl('', [Validators.required]),
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
        this.AuditForm = response;
        this.FillFormData()
      });
  }
  FillFormData() {
    this.ReportForm.controls["name"].patchValue(this.AuditForm.name);
    this.ReportForm.controls["last_name"].patchValue(this.AuditForm.last_name);
    if(this.AuditForm.day_of_birth!=null){
      this.ReportForm.controls["day_of_birth"].patchValue(moment(this.AuditForm.day_of_birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
      }
    this.ReportForm.controls["email"].patchValue(this.AuditForm.email);
    this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    this.ReportForm.controls["mobile_number"].patchValue(this.AuditForm.mobile_number);
    this.ReportForm.controls["address"].patchValue(this.AuditForm.address);
    this.ReportForm.controls["level"].patchValue(this.AuditForm.level);
    this.ReportForm.controls["id_card_number"].patchValue(this.AuditForm.id_card_number);
    this.ReportForm.controls["user_pk_id"].patchValue(this.id);
  }
  onSubmit() {

    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }

    this.btnLoading = true
    let ReportFormValue: IStudentsForm =
    {
      user_pk_id:this.id,
      name: this.ReportForm.controls.name.value,
      last_name: this.ReportForm.controls.last_name.value,
      day_of_birth: moment.from(this.ReportForm.controls.day_of_birth.value, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'),
      email: this.ReportForm.controls.email.value,
      mobile_number: this.ReportForm.controls.mobile_number.value,
      address: this.ReportForm.controls.address.value,
      level: this.ReportForm.controls.level.value,
      id_card_number: this.ReportForm.controls.id_card_number.value,
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
    this.btnLoading=false
  }
}

