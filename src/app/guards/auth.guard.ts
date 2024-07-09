import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private authService: AuthenticationService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.IsAuthenticated() !== true) {
      this.router.navigate(['auth/sigin']);
      return false;
    }
    return true;
  }

}
