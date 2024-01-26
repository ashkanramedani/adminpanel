import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  Theme: any;
  isOpenDorpdownProfile: boolean = false;

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
}
