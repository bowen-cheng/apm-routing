import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategyService implements PreloadingStrategy {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    // $$ Read the data object configured in app-routing module to determine if we should execute preloading
    if (route.data && route.data['preload']) {
      log('Preloading...');
      return fn();
    }
    log('Not preloading');
    return of(null);
  }
}
