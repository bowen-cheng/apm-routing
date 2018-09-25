import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements /* CanActivate, */ CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  /*
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn(state.url);
  }
  */

  canLoad(route: Route): boolean {
    return this.isLoggedIn(route.path);
  }

  isLoggedIn(requestUrl: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // $$ Store the requested URL into authService, which is a shared singleton and can later be accessed from LoginComponent.
      // LoginComponent will then redirect users back to the requested URL.
      this.authService.redirectUrl = requestUrl;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
