import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './services/http.service';
import { Domain } from './domain/doamin';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isOpenHamburgerMenu: boolean = false;
  isOpenDorpdownProfile: boolean = false;
  Theme: any;
  menuItem: number=0;
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

  openDorpdownProfile() {
    this.isOpenDorpdownProfile = !this.isOpenDorpdownProfile;
  }
  changeDarkMode() {
    this.Theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.Theme);
    if (this.Theme === 'dark') {
      this.Theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      this.Theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }
  openHamburgerMenu() {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }
  ChangeMenuItem(item: number) {
    if (this.menuItem == item) this.menuItem = 0;
    else this.menuItem = item;
  }
}
