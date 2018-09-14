import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  // These variables are available to any class that injects this service
  messages: string[] = [];
  isDisplayed = false;

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
  }
}
