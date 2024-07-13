import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/domain/doamin';
import { IloggedInUser } from 'src/app/interfaces/IloggedInUser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  isOpenHamburgerMenu: boolean = false;
  menuItem: number = 0;
  subMenuItem: number = 0;
  loggedInUser ={} as IloggedInUser
  constructor(private authService: AuthenticationService, private alertServices: AlertifyService, private http: HttpService) { }
  ngOnInit(): void {
    this.GetloggedInUser()
  }
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
  GetloggedInUser() {
    if (this.authService.IsAuthenticated()) {
      const user_pk_id = localStorage.getItem('user_pk_id')
      if (user_pk_id != null) {
        this.http.get(Domain.GetloggedInUser, user_pk_id).subscribe((response: IloggedInUser) => {
          this.loggedInUser = response
        })
      }
    }
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
