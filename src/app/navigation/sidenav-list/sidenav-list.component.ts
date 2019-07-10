import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  private authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscribeToAuthChange();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLinkClick(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.closeSidenav.emit();
    this.authService.logout();
  }

  private subscribeToAuthChange(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authenticated: boolean) => {
        this.isAuth = authenticated;
      }
    );
  }
}
