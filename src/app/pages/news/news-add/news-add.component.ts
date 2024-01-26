import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: [ './news-add.component.css' ]
})
export class NewsAddComponent {
  public Editor = ClassicEditor;
}
