import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from './../../auth/index';
import { StoreService } from './../../store/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.storeService.getIsAuthenticated();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
