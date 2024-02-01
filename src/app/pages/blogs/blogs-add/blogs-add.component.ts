import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Domain } from 'src/app/domain/doamin';
import { ITagValue } from 'src/app/interfaces/ITagValue';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-blogs-add',
  templateUrl: './blogs-add.component.html',
  styleUrl: './blogs-add.component.css',
})
export class BlogsAddComponent implements OnInit {
  postForm: FormGroup;
  fileToUpload: any;
  post_topic_list: any;
  post_category_list: any;
  imageUrl: any;
  imageUploadedSize:any;
  isOpenSearchTag: boolean = false;
  tag_list: ITagValue[] = [];
  size_limit: boolean = false;
  tagsInputArray: string[] = [];
  usersPostSpeakerArray: string[] = [];
  usersPostWriterArray: string[] = [];
  usersPostActorArray: string[] = [];

  isOpenShowMore: boolean = false;
  constructor(private http: HttpService,private alert:AlertifyService) {
    this.postForm = new FormGroup({
      post_title: new FormControl('', [Validators.required]),
      post_summary: new FormControl('', [Validators.required]),
      post_discribtion: new FormControl(''),
      post_content: new FormControl('', [Validators.required]),
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
  }
  ngOnInit(): void {
    this.get_post_topic();
    this.get_post_category();
    this.get_tag_list();
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
  RemoveUsersPostWriter(index: number) {
    this.usersPostWriterArray.splice(index, 1);
  }
  AddTagInputManually()
{ 
  if (this.postForm.controls.tag.value.length > 0) {
    this.tagsInputArray.push(
      this.postForm.controls.tag.value
    );
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

   let image:any = event.target.files[0];
   let fr = new FileReader();
   fr.onload = (e: any) => { // when file has loaded
    var img = new Image();
    img.onload = () => {
      if (img.height != 500 && img.height != 500) 
        this.alert.error(" سایز عکس مجاز 500*500  می باشد")
      else
        this.imageUrl = e.target.result;
    };

    img.src = e.target.result; // The data URL 
};

  fr.readAsDataURL(image);
   //this.imgType.nativeElement.value = ""; // clear the value after upload

    }
  }

  // this.fileToUpload = event.target.files[0];
  // //Show image preview
  // let reader = new FileReader();
  // reader.onload = (event: any) => {
  //   this.imageUrl = event.target.result;
  //   var img = new Image();
  //   img.src = event.target.result;
  //   alert(img.height)
  //   alert(img.width)
  //   if (img.height != 500 && img.height != 500) this.size_limit = true;
  // };
  // alert(this.size_limit)
  // if (this.size_limit) {
  //   alert('lotfan size kamtar entekhab konid');
  // } else {
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  // if (this.size_limit) {
  //   alert('lotfan size kamtar entekhab konid');
  // } else {
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  // this.fileToUpload = event.target.files[0]
  // var fr = new FileReader;
  // this.imageUrl = event.target.result;
  // fr.onload = function () {
  //     var img = new Image;
  //     img.onload = function () {
  //         alert(img.width);
  //     };
  //     img.src = event.target.result
  // };
  // fr.readAsDataURL(this.fileToUpload);
  // this.fileToUpload = event.target.files[0]
  // let reader = new FileReader();
  // reader.onload = (event: any) => {
  //   this.imageUrl = event.target.result;
  //   //new
  //   var image = new Image();
  //   image.src=event.target.result
  //   image.onload = function () {
  //     alert(image.width + " | " + image.height);
  // };
  // }
  // reader.readAsDataURL(this.fileToUpload);

  RemoveImage() {
    this.imageUrl = '';
  }
  OpenShowMore() {
    this.isOpenShowMore = !this.isOpenShowMore;
  }
  onSubmit() {}
}
