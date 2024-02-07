
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Domain } from 'src/app/domain/doamin';
import { IPost } from 'src/app/interfaces/IPost';
import { IPostWriter } from 'src/app/interfaces/IPostWriter';
import { ITagValue } from 'src/app/interfaces/ITagValue';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrl: './content-add.component.css'
})
export class ContentAddComponent implements OnInit {
  page_title: string = 'افزودن';
  postForm: FormGroup;
  id: number = 0;
  is_open_post_writer: boolean = false;
  fileToUpload: any;
  post_topic_list: any;
  post_category_list: any;
  imageUrl: any;
  photoUploaded:string
  imageUploadedSize: any;
  isOpenSearchTag: boolean = false;
  tag_list: ITagValue[] = [];
  post_writer_list: IPostWriter[] = [];
  size_limit: boolean = false;
  tagsInputArray: string[] = [];
  usersPostSpeakerArray: string[] = [];
  usersPostWriterArray: string[] = [];
  usersPostActorArray: string[] = [];
  post:IPost;
  isOpenShowMore: boolean = false;
  constructor(
    private http: HttpService,
    private alert: AlertifyService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot?.paramMap.get('id'));

    this.postForm = this.formBuilder.group({
      post_title: new FormControl('', [Validators.required]),
      post_summary: new FormControl('', [Validators.required]),
      post_discribtion: new FormControl(''),
      post_content: new FormControl(''),
      post_image: new FormControl('', [Validators.required]),
      post_type: new FormControl(''),
      post_priority: new FormControl('5'),
      post_status: new FormControl(true),
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
      users_post_writer: new FormControl('', [Validators.required]),
      users_post_actor: new FormControl(''),
      tag: new FormControl(''),
    });
    if (this.id > 0) {
      this.page_title = 'ویرایش';
      this.get_single_post();
    }
    this.get_post_topic();
    this.get_post_category();
    this.get_tag_list();
    this.get_user_post_writer_list();
  }
  get_single_post() {
    //TODO
    this.http
      .get(Domain.GetSinglePost,this.id)
       .subscribe((response) => {
        this.post=response;
        this.FillFormData()
       
      });
  }
  FillFormData()
  {
    this.postForm.controls["post_title"].patchValue(this.post.post_title);
    this.postForm.controls["post_discribtion"].patchValue(this.post.post_discribtion);
    this.postForm.controls["post_summary"].patchValue(this.post.post_summary);
    this.postForm.controls["post_content"].patchValue(this.post.post_content);
    this.postForm.controls["post_status"].patchValue(this.post.post_status);
    this.postForm.controls["post_direction"].patchValue(this.post.post_direction);
    this.photoUploaded="https://ieltsdaily.ir/static/img/blogs/"+this.post.post_image;
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
  RemovePostWriterTag(index: number) {
    this.usersPostWriterArray.splice(index, 1);
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
    if (this.postForm.controls.users_post_speaker.value.length > 0) {
      this.usersPostSpeakerArray.push(
        this.postForm.controls.users_post_speaker.value
      );
      this.postForm.controls.users_post_speaker.setValue('');
    }
  }
  RemoveUsersPostSpeaker(index: number) {
    this.usersPostSpeakerArray.splice(index, 1);
  }
  AddUsersPostWriter() {
    if (this.postForm.controls.users_post_writer.value.length > 0) {
      this.usersPostWriterArray.push(
        this.postForm.controls.users_post_writer.value
      );
      this.postForm.controls.users_post_writer.setValue('');
    }
  }
  OpenPostWriter() {
    this.is_open_post_writer = !this.is_open_post_writer;
  }
  AddTagInputManually() {
    if (this.postForm.controls.tag.value.length > 0) {
      this.tagsInputArray.push(this.postForm.controls.tag.value);
      this.postForm.controls.tag.setValue('');
    }
  }
  AddUsersPostActor() {
    if (this.postForm.controls.users_post_actor.value.length > 0) {
      this.usersPostActorArray.push(
        this.postForm.controls.users_post_actor.value
      );
      this.postForm.controls.users_post_actor.setValue('');
    }
  }
  RemoveUsersPostActor(index: number) {
    this.usersPostActorArray.splice(index, 1);
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
            this.alert.error(' سایز عکس مجاز 500*500  می باشد');
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
  OpenShowMore() {
    this.isOpenShowMore = !this.isOpenShowMore;
  }
  onSubmit() {}
}
