import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  Theme: any;
  ngOnInit(): void {
    if (localStorage.getItem('theme') === null) {
      this.Theme = 'light';
      localStorage.setItem('theme', 'light');
      //document.documentElement.classList.add('light');
    } else {
      this.Theme = localStorage.getItem('theme');
      if (this.Theme === 'dark') {
        this.Theme = 'dark';
        document.documentElement.classList.add('dark');
      } else {
        this.Theme = 'light';
        document.documentElement.classList.remove('dark');
      }
    }
  }




}
