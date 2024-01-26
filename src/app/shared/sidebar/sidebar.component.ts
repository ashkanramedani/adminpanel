import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  isOpenHamburgerMenu: boolean = false;
  menuItem: number=0;

  ChangeMenuItem(item: number) {
    if (this.menuItem == item) this.menuItem = 0;
    else this.menuItem = item;
  }
  openHamburgerMenu() {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }
}
