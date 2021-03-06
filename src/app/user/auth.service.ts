import { Injectable } from '@angular/core';
import { MessageService } from '../messages/message.service';

import { User } from './user';

@Injectable()
export class AuthService {
  currentUser: User;
  // $$ This URL is stored in the AuthService given it is a singleton. Thus it is available to all components that has this service injected
  redirectUrl: string;

  constructor(private messageService: MessageService) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }
}
