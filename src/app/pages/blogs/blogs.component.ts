import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit {
  BlogsData:any;
  isLoading:boolean=true;
  constructor(private http:HttpService)
  {}
  ngOnInit(): void {
    this.GetBlogsData()
  }
  GetBlogsData()
  {
    this.http.getAll(Domain.GetPost+"/blog/read").subscribe((response)=>
    {this.isLoading=false
      this.BlogsData=response;
    })
  }
}
