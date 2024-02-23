import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-libraries-add',
  templateUrl: './libraries-add.component.html',
  styleUrl: './libraries-add.component.css'
})
export class LibrariesAddComponent implements OnInit {
  id: number = 0
  page_title: string = "افزودن"
  librariesForm: FormGroup
  constructor(private http: HttpService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot?.paramMap.get('id'));
    if (this.id > 0) {
      this.page_title = 'ویرایش';
      this.get_single_library();
    }
  }
  get_single_library() {

  }
  onSubmit()
  {
    
  }
}
