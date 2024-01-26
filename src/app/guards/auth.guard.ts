import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate
{
  constructor(private authService:AuthenticationService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.authService.IsAuthenticated)
      {
        this.router.navigate(['']);
        return false;
      }
      return true;
  }

}
