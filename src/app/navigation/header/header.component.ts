import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();

  private authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscribeToAuthChange();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
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
