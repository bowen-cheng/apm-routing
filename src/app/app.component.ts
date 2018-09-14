import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { MessageService } from './messages/message.service';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected pageTitle = 'Acme Product Management';
  protected isLoading = false;

  constructor(protected authService: AuthService, private router: Router, protected messageService: MessageService) {
    // $$ Subscribe to navigation event changes and update isLoading flag as event changes
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError) {
      this.isLoading = false;
    }
  }

  displayMessages(): void {
    this.messageService.isDisplayed = true;
    // $$ Activating secondary routes from code
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
  }

  hideMessages(): void {
    this.messageService.isDisplayed = false;
    // $$ Clearing secondary routes from code
    this.router.navigate([{ outlets: { popup: null } }]);
  }

  logOut(): void {
    // $$ navigateByUrl clears all secondary routes and route parameters
    this.router.navigateByUrl('/welcome');
    this.authService.logout();
    console.log('Log out');
  }
}
