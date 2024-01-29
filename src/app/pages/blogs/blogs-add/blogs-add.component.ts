import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blogs-add',
  templateUrl: './blogs-add.component.html',
  styleUrl: './blogs-add.component.css',
})
export class BlogsAddComponent {
  postForm: FormGroup;
  fileToUpload: any;
  imageUrl: any;

  tagsInputArray: string[] = [];
  usersPostSpeakerArray:string[]=[];
  usersPostWriterArray:string[]=[];
  usersPostActorArray:string[]=[];


  isOpenShowMore:boolean=false;
  constructor() {
    this.postForm = new FormGroup({
      post_title: new FormControl('', [Validators.required]),
      post_summary: new FormControl('', [Validators.required]),
      post_discribtion:new FormControl('',[Validators.required]),
      post_content:new FormControl('',[Validators.required] ),
      post_image: new FormControl('', [Validators.required]),
      post_type: new FormControl('', [Validators.required]),
      post_priority: new FormControl('5', [Validators.required]),
      post_status:new FormControl(true),
      post_direction: new FormControl('RTL', [Validators.required]),
      visible: new FormControl(true, [Validators.required]),
      expier_date: new FormControl(''),
      categoty: new FormControl('', [Validators.required]),
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
    });
  }
  public Editor = ClassicEditor;
  dateValue = new FormControl();
  AddTagInput() {
    if (this.postForm.controls.tag.value.length > 0) {
      this.tagsInputArray.push(this.postForm.controls.tag.value);
      this.postForm.controls.tag.setValue('');
    }
  }
  RemoveTagInput(index:number)
  {
    this.tagsInputArray.splice(index,1);
  }

  AddUsersPostSpeaker() {
    if (this.postForm.controls.users_post_speaker.value.length > 0) {
      this.usersPostSpeakerArray.push(this.postForm.controls.users_post_speaker.value);
      this.postForm.controls.users_post_speaker.setValue('');
    }
  }
  RemoveUsersPostSpeaker(index:number)
  {
    this.usersPostSpeakerArray.splice(index,1);
  }
  AddUsersPostWriter() {
    if (this.postForm.controls.users_post_writer.value.length > 0) {
      this.usersPostWriterArray.push(this.postForm.controls.users_post_writer.value);
      this.postForm.controls.users_post_writer.setValue('');
    }
  }
  RemoveUsersPostWriter(index:number)
  {
    this.usersPostWriterArray.splice(index,1);
  }
  AddUsersPostActor() {
    if (this.postForm.controls.users_post_actor.value.length > 0) {
      this.usersPostActorArray.push(this.postForm.controls.users_post_actor.value);
      this.postForm.controls.users_post_actor.setValue('');
    }
  }
  RemoveUsersPostActor(index:number)
  {
    this.usersPostActorArray.splice(index,1);
  }


  UploadImage(event:any)
  {
    this.fileToUpload = event.target.files[0]
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  RemoveImage()
  {
    this.imageUrl = '';
  }
  OpenShowMore()
  {
    this.isOpenShowMore=!this.isOpenShowMore;
  }
  onSubmit()
  {
    
  }
}
