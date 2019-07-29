import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: any, duration: number): void {
    this.snackBar.open(message, action, { duration });
  }
}
