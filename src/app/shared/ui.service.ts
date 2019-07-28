import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();
}
