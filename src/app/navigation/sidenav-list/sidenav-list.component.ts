import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { AuthService } from './../../auth/index';
import { StoreService } from './../../store/index';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavListComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.storeService
      .getIsAuthenticated()
      .pipe(shareReplay());
  }

  onLinkClick(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.closeSidenav.emit();
    this.authService.logout();
  }
}
