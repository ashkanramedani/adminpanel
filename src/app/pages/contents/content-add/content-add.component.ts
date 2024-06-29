import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/domain/doamin';
import { IUsers } from 'src/app/interfaces/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';
import { IRoles } from 'src/app/interfaces/IRoles';
import { IClassDetails } from 'src/app/interfaces/IClassDetails';
import { ILeaveRequest } from 'src/app/interfaces/ILeaveRequest';
import { ILeaveRequestForm } from 'src/app/interfaces/ILeaveRequestForm';
import * as moment from 'jalali-moment';
import { IPost } from 'src/app/interfaces/IPost';
import { IPostWriter } from 'src/app/interfaces/IPostWriter';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ITagValue } from 'src/app/interfaces/ITagValue';
import { IPostForm } from 'src/app/interfaces/IPostForm';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
})
export class ContentAddComponent implements OnInit {
  //#region change this information
  cancle_link: string = '/contents?type=blog'
  form_title:string=" محتوای آموزشی"
  post_category_list: any;
  AuditForm: IPost
  get_Singel_route: string = Domain.GetPost
  put_route: string = Domain.PatchPost
  create_route: string = Domain.CreatePost
  //#endregion
  tag_list: ITagValue[] = [];
  post_topic_list: any;
  post_writer_list: IPostWriter[] = [];
  isOpenSearchTag: boolean = false;
  imageUrl: any;
  page_title: string = "ایجاد"
  tagsInputArray: string[] = [];
  usersPostSpeakerArray: string[] = [];
  usersPostWriterArray: string[] = [];
  usersPostActorArray: string[] = [];
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
  photoUploaded: string
  EmployiesData: IUsers[] = []
  btnLoading: boolean = false
  isLoading: boolean = false
  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder, private alertServices: AlertifyService,private router:Router) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot?.paramMap.get('id');
    this.get_post_topic();
    this.get_post_category();
    this.get_tag_list();
    this.get_user_post_writer_list();

    this.ReportForm = this.formBuilder.group(
      {
        post_title: new FormControl('', [Validators.required]),
      post_summary: new FormControl('', [Validators.required]),
      post_discribtion: new FormControl(''),
      post_content: new FormControl(''),
      post_image: new FormControl('', [Validators.required]),
      post_type: new FormControl(''),
      post_priority: new FormControl('5'),
      post_status: new FormControl(),
      post_direction: new FormControl('RTL'),
      visible: new FormControl(true),
      expier_date: new FormControl(''),
      categoty: new FormControl(''),
      audio_file_link: new FormControl(''),
      audio_file_path: new FormControl(''),
      aparat_video_id: new FormControl(''),
      aparat_video_code: new FormControl(''),
      video_file_link: new FormControl(''),
      video_file_path: new FormControl(''),
      data_file_link: new FormControl(''),
      data_file_path: new FormControl(''),
      users_post_speaker: new FormControl(''),
      users_post_writer: new FormControl(''),
      users_post_actor: new FormControl(''),
      tag: new FormControl(''),
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
  get_user_post_writer_list() {
    this.http.getAll(Domain.GetEmployees).subscribe((response) => {
      this.post_writer_list = response;
    });
  }
  OpenSearchTag() {
    this.isOpenSearchTag = !this.isOpenSearchTag;
  }
  public Editor = ClassicEditor;
  dateValue = new FormControl();
  get_tag_list() {
    this.http.getAll(Domain.GetTagList).subscribe((response) => {
      this.tag_list = response;
    });
  }

  get_post_category() {
    this.http.getAll(Domain.GetPostCategory).subscribe((response) => {
      this.post_category_list = response;
    });
  }
  AddTagInput(id: number, label: string) {
    if (label != '' && !this.tagsInputArray.includes(label)) {
      this.tagsInputArray.push(label);
    }
  }
  AddPostWriterTag(id: number, fname: string, lname: string) {
    if (
      id != null &&
      !this.usersPostWriterArray.includes(fname + ' ' + lname)
    ) {
      this.usersPostWriterArray.push(fname + ' ' + lname);
    }
  }
  RemoveTagInput(index: number) {
    this.tagsInputArray.splice(index, 1);
  }
  get_post_topic() {
    this.http.getAll(Domain.GetPostTopic).subscribe((response) => {
      this.post_topic_list = response;
    });
  }
  AddUsersPostSpeaker() {
    if (this.ReportForm.controls.users_post_speaker.value.length > 0) {
      this.usersPostSpeakerArray.push(
        this.ReportForm.controls.users_post_speaker.value
      );
      this.ReportForm.controls.users_post_speaker.setValue('');
    }
  }
  AddUsersPostWriter() {
    if (this.ReportForm.controls.users_post_writer.value.length > 0) {
      this.usersPostWriterArray.push(
        this.ReportForm.controls.users_post_writer.value
      );
      this.ReportForm.controls.users_post_writer.setValue('');
    }
  }
  AddTagInputManually() {
    if (this.ReportForm.controls.tag.value.length > 0) {
      this.tagsInputArray.push(this.ReportForm.controls.tag.value);
      this.ReportForm.controls.tag.setValue('');
    }
  }

  UploadImage(event: any) {
    if (event && event.target && event.target.files) {
      let image: any = event.target.files[0];
      let fr = new FileReader();
      fr.onload = (e: any) => {
        // when file has loaded
        var img = new Image();
        img.onload = () => {
          if (img.height != 500 && img.height != 500)
            this.alertServices.error(' سایز عکس مجاز 500*500  می باشد');
          else this.imageUrl = e.target.result;
        };
        img.src = e.target.result; // The data URL
      };
      fr.readAsDataURL(image);
    }
  }
  RemoveImage() {
    this.imageUrl = '';
  }
  FillFormData() {
    this.ReportForm.controls["post_title"].patchValue(this.AuditForm.post_title);
    this.ReportForm.controls['post_type'].patchValue(this.AuditForm.post_type);
    this.ReportForm.controls['post_direction'].patchValue(this.AuditForm.post_direction)
    this.ReportForm.controls['post_priority'].patchValue(this.AuditForm.priority)
    this.ReportForm.controls['expier_date'].patchValue(this.AuditForm.expier_date);
    this.AuditForm.tag.forEach(val => this.tagsInputArray.push(Object.assign({}, val)));
    this.AuditForm.users_post_actor.forEach(val => this.usersPostActorArray.push(Object.assign({}, val)))
    this.AuditForm.users_post_speaker.forEach(val => this.usersPostSpeakerArray.push(Object.assign({}, val)))
    this.AuditForm.users_post_writer.forEach(val => this.usersPostWriterArray.push(Object.assign({}, val)))
    this.ReportForm.controls['audio_file_link'].patchValue(this.AuditForm.post_audio_file_link)
    this.ReportForm.controls["post_discribtion"].patchValue(this.AuditForm.post_discribtion);
    this.ReportForm.controls['audio_file_path'].patchValue(this.AuditForm.post_audio_file_path)
    this.ReportForm.controls['aparat_video_id'].patchValue(this.AuditForm.post_aparat_video_id)
    this.ReportForm.controls['aparat_video_code'].patchValue(this.AuditForm.post_aparat_video_code)
    this.ReportForm.controls['video_file_link'].patchValue(this.AuditForm.post_video_file_link)
    this.ReportForm.controls['video_file_path'].patchValue(this.AuditForm.post_video_file_path)
    this.ReportForm.controls['data_file_link'].patchValue(this.AuditForm.post_data_file_link)
    this.ReportForm.controls['data_file_path'].patchValue(this.AuditForm.post_data_file_path)
    this.ReportForm.controls["post_summary"].patchValue(this.AuditForm.post_summary);
    this.ReportForm.controls["post_content"].patchValue(this.AuditForm.post_content);
    this.ReportForm.controls["post_status"].patchValue(this.AuditForm.post_status);
    this.photoUploaded = "https://ieltsdaily.ir/static/img/blogs/" + this.AuditForm.post_image;
  }
  onSubmit() {
    if (this.ReportForm.invalid) {
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.btnLoading = true
    let ReportFormValue: IPostForm =
    {
      post_title: this.ReportForm.controls.post_title.value,
      post_summary: this.ReportForm.controls.post_summary.value,
       post_discribtion: this.ReportForm.controls.post_de.value,
      post_content: this.ReportForm.controls.post_content.value,
      post_image: this.ReportForm.controls.post_image.value,
      priority: this.ReportForm.controls.post_priority.value,
      post_status: this.ReportForm.controls.post_status.value,
      post_direction: this.ReportForm.controls.post_direction.value,
      post_type: this.ReportForm.controls.post_type.value,
      expier_date: this.ReportForm.controls.expier_date.value,
      //category: [];
      tag: this.tagsInputArray,
      post_audio_file_link: this.ReportForm.controls.audio_file_link.value,
      post_audio_file_path: this.ReportForm.controls.audio_file_path.value,
      post_aparat_video_id: this.ReportForm.controls.aparat_video_id.value,
      post_aparat_video_code: this.ReportForm.controls.aparat_video_code.value,
      post_video_file_link: this.ReportForm.controls.video_file_link.value,
      post_video_file_path: this.ReportForm.controls.video_file_path.value,
      post_data_file_link: this.ReportForm.controls.data_file_link.value,
      post_data_file_path: this.ReportForm.controls.data_file_path.value,
      users_post_speaker: this.usersPostSpeakerArray,
      users_post_writer: this.usersPostWriterArray,
      users_post_actor: this.usersPostActorArray




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


  add_users_post_actor(value: string[]) {
    this.usersPostActorArray = value;
  }
  add_users_post_speaker(value: string[]) {
    this.usersPostSpeakerArray = value;
  }
  add_users_post_writer(value: string[]) {
    this.usersPostWriterArray = value
  }
}

