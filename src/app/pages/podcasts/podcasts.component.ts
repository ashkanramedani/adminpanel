import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
})
export class PodcastsComponent implements OnInit {
  PodcastsData: any;
  isLoading:boolean=true;
  constructor(private http: HttpService,private alert:AlertifyService) {}
  ngOnInit(): void {
    this.GetPodcastsData();
  }
  GetPodcastsData() {
    this.http.getAll(Domain.GetPost + '/podcast/read').subscribe((response) => {
      this.isLoading=false;
      this.PodcastsData = response;
    });
  }
  RemoveItem(id:number) {
    this.alert.confirm(
      'حذف آیتم',
      'آیا از حذف این آیتم اطمینان دارید؟',
      () => {
        this.http.delete(Domain.DeletePost+"/podcast/delete",id).subscribe((response)=>
        {
          console.log(response);
        });
        this.GetPodcastsData()
        this.alert.success("آیتم با موفقیت حذف شد");
      },
      () => {}
    );
  }
}
