import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { StoreService } from '../store/index';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private storeService: StoreService) {}

  canActivate(): Observable<boolean> {
    return this.storeService.getIsAuthenticated().pipe(take(1));
  }
  canLoad(): Observable<boolean> {
    return this.storeService.getIsAuthenticated().pipe(take(1));
  }
}
