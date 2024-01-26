import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blogs-add',
  templateUrl: './blogs-add.component.html',
  styleUrl: './blogs-add.component.css'
})
export class BlogsAddComponent {
  public Editor = ClassicEditor;
  dateValue = new FormControl();
}
