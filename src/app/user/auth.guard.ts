import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserModule } from './user.module';

@Injectable({
  providedIn: UserModule
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn(state.url);
  }

  isLoggedIn(requestUrl: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.redirectUrl = requestUrl;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
