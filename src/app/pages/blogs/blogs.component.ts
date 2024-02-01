import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Domain } from 'src/app/domain/doamin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
})
export class BlogsComponent implements OnInit {
  BlogsData: any;
  isLoading: boolean = true;
  constructor(private http: HttpService, private alert: AlertifyService) {}
  ngOnInit(): void {
    this.GetBlogsData();
  }
  GetBlogsData() {
    this.http.getAll(Domain.GetPost + '/blog/read').subscribe((response) => {
      this.isLoading = false;
      this.BlogsData = response;

    });
  }
  RemoveItem(id:number) {
    this.alert.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http.delete(Domain.DeletePost+"/blog/delete",id).subscribe((response)=>
        {
          console.log(response);
        });
        this.GetBlogsData();
        this.alert.success("آیتم با موفقیت حذف شد");
      },
      () => {}
    );
  }
}
