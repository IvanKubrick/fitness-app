import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onLinkClick() {
    this.closeSidenav.emit();
  }
}
