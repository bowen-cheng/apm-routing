import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  constructor(protected authService: AuthService, private router: Router) { }

  logOut(): void {
    // $$ navigateByUrl clears all secondary routes and route parameters
    this.router.navigateByUrl('/welcome');
    this.authService.logout();
    console.log('Log out');
  }
}
