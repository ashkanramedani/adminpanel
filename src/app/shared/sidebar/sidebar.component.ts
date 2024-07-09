import { Component } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  isOpenHamburgerMenu: boolean = false;
  menuItem: number = 0;
  subMenuItem: number = 0;

  constructor(private authService: AuthenticationService, private alertServices: AlertifyService) { }
  ChangeMenuItem(item: number) {
    if (this.menuItem == item) this.menuItem = 0;
    else this.menuItem = item;
  }
  ChangeSubMenuItem(item: number) {
    if (this.subMenuItem == item) this.subMenuItem = 0;
    else this.subMenuItem = item;
  }
  openHamburgerMenu() {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }
  Logout() {

    this.alertServices.confirm(
      ' خروج از سامانه',
      'می خواهید از سامانه خارج شوید؟',
      () => {
        this.authService.logout()
      },
      () => { }
    );




  }
}
