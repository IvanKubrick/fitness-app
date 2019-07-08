import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLinkClick() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
