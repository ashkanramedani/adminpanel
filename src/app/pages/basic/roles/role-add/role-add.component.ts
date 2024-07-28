import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IRolesForm } from 'src/app/interfaces/IRolesForm';
import { IRoleCluster } from 'src/app/interfaces/IRoleCluster';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
})
export class RoleAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/basic/roles'
  form_title:string="نقش"
  AuditForm: IRolesForm
  get_Singel_route: string = Domain.GetRolesData
  put_route: string = Domain.PutRolesData
  create_route: string = Domain.CreateRolesData
  //#endregion
  @Input() ShowCancleLink:boolean=true
  page_title: string = "ایجاد"
  RoleClusterData:string[]=[]
  ReportForm: FormGroup;
  isOpenSearchCluster: boolean = false
  RolesData: IRoles[] = []
  ClusterInput: string=''
  id: any;
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router: Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.GetEmployeeData()
    this.GetRolesClusterData()
    this.ReportForm = this.formBuilder.group(
      {
        created_fk_by: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        name: new FormControl('',[Validators.required]),
        cluster: new FormControl('')
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
  GetRolesClusterData() {
    this.http.getAll(Domain.GetRoleCluster).subscribe((response) => {
      this.RoleClusterData = response;
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
    this.ReportForm.controls["name"].patchValue(this.AuditForm.name);
    this.ClusterInput=this.AuditForm.cluster
    //this.ReportForm.controls["cluster"].patchValue(this.AuditForm.cluster);
    this.ReportForm.controls["role_pk_id"].patchValue(this.id);
  }
  onSubmit() {

    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }

    this.btnLoading = true
    let ReportFormValue: IRolesForm =
    {
      role_pk_id:this.id,
      created_fk_by: this.ReportForm.controls.created_fk_by.value,
      description: this.ReportForm.controls.description.value,
      name: this.ReportForm.controls.name.value,
      cluster: this.ClusterInput
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
        this.ClusterInput=''
        this.isOpenSearchCluster=false
      }
      )
    }
    this.btnLoading=false
  }


  OpenSearchCluster() {
    this.isOpenSearchCluster = !this.isOpenSearchCluster;
  }
  AddClusterInput(name: string) {
    if (name != '') {
      this.ClusterInput=name;
    }
    this.isOpenSearchCluster=false
  }
  RemoveRoleInput() {
    this.ClusterInput=''
  }
  AddClusterInputManually() {
    if (this.ReportForm.controls.cluster.value.length > 0) {
      this.ClusterInput=this.ReportForm.controls.cluster.value;
      this.ReportForm.controls.cluster.setValue('');
    }
  }

}

