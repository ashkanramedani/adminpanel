import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Domain } from 'src/app/domain/doamin';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
})
export class PodcastsComponent implements OnInit {
  PodcastsData: any;
  isLoading:boolean=true;
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.GetPodcastsData();
  }
  GetPodcastsData() {
    this.http.getAll(Domain.GetPost + '/podcast/read').subscribe((response) => {
      this.isLoading=false;
      this.PodcastsData = response;
    });
  }
}
