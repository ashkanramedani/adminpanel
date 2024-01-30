import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {
  NewsData:any
  isLoading:boolean=true;
  constructor(private http: HttpService,private alert:AlertifyService) {}
  ngOnInit(): void {
    this.GetNewsData();
  }
  GetNewsData() {
    this.http.getAll(Domain.GetPost + '/news/read').subscribe((response) => {
      this.isLoading=false;
      this.NewsData=response;
    });
  }

  RemoveItem(id:number) {
    this.alert.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http.delete(Domain.DeletePost+"/posts/delete",id).subscribe((response)=>
        {
          console.log(response);
        })
      },
      () => {}
    );
  }
}
