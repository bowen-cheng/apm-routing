import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService, private router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (!!this.authService.redirectUrl) {
        // $$ Access the shared variable held in the singleton service
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        // Navigate to the Product List page after log in.
        this.router.navigate(['/products']);
      }

    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
