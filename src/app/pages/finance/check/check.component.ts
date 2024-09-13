import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
})
export class CheckComponent implements OnInit {
  step:number=1
  private readonly activateRoute=inject(ActivatedRoute)

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((res) => {
      this.step = Number(res.step);
    });
  }

}
