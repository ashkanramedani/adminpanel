import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-podcast-add',
  templateUrl: './podcast-add.component.html',
  styleUrl: './podcast-add.component.css'
})
export class PodcastAddComponent {
  public Editor = ClassicEditor;
}
