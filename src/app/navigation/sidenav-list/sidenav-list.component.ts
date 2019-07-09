import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isAuth = false;

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  private authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscribeToAuthChange();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLinkClick() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.closeSidenav.emit();
    this.authService.logout();
  }

  private subscribeToAuthChange() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authenticated: boolean) => {
        this.isAuth = authenticated;
      }
    );
  }
}
