import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {
  NewsData:any
  isLoading:boolean=true;
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.GetNewsData();
  }
  GetNewsData() {
    this.http.getAll(Domain.GetPost + '/news/read').subscribe((response) => {
      this.isLoading=false;
      this.NewsData=response;

    });
  }
}
